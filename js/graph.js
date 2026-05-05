class SkillGraph {
  constructor(containerId) {
    this.containerId = containerId;
    this.simulation = null;
    this.svg = null;
    this.zoom = null;
    this.width = 0;
    this.height = 0;
    this.tooltip = null;
    this.detailPanel = null;
    this.activeFilter = 'all';
    this._atomicTimer = null;
    this.colors = {
      person:  '#ffffff',
      skill:   '#00d4ff',
      project: '#10b981',
      paper:   '#f59e0b',
      company: '#8b5cf6'
    };
    this.glows = {
      person:  'drop-shadow(0 0 6px rgba(255,255,255,0.95))',
      skill:   'drop-shadow(0 0 5px rgba(0,212,255,0.9))',
      project: 'drop-shadow(0 0 5px rgba(16,185,129,0.9))',
      paper:   'drop-shadow(0 0 5px rgba(245,158,11,0.9))',
      company: 'drop-shadow(0 0 5px rgba(139,92,246,0.9))'
    };
  }

  getNodeRadius(d) {
    const radii = { person: 9, company: 7, project: 6, paper: 6, skill: 4 };
    return radii[d.group] || 4;
  }

  init() {
    const container = document.getElementById(this.containerId);
    this.width = container.clientWidth;
    this.height = container.clientHeight;
    this.tooltip = document.getElementById('graph-tooltip');
    this.detailPanel = document.getElementById('graph-detail-panel');

    this.drawStarField(container);

    this.svg = d3.select(`#${this.containerId}`)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('position', 'absolute')
      .style('top', 0)
      .style('left', 0);

    const defs = this.svg.append('defs');
    this.addFilters(defs);

    const g = this.svg.append('g').attr('class', 'graph-g');

    this.zoom = d3.zoom()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => g.attr('transform', event.transform));

    this.svg.call(this.zoom).on('dblclick.zoom', null);

    const nodes = graphData.nodes.map(d => ({ ...d }));
    const links = graphData.links.map(d => ({ ...d }));

    this.simulation = d3.forceSimulation(nodes)
      .alphaDecay(0.006)
      .velocityDecay(0.3)
      .force('link', d3.forceLink(links).id(d => d.id).distance(d => {
        const src = d.source.group || '';
        const tgt = d.target.group || '';
        if (src === 'person' || tgt === 'person') return 160;
        if (src === 'company' || tgt === 'company') return 130;
        if (src === 'project' || tgt === 'project') return 110;
        if (src === 'paper' || tgt === 'paper') return 100;
        return 80;
      }).strength(0.5))
      .force('charge', d3.forceManyBody().strength(d => {
        if (d.group === 'person') return -600;
        if (d.group === 'company') return -350;
        if (d.group === 'project' || d.group === 'paper') return -250;
        return -150;
      }))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force('collision', d3.forceCollide(d => this.getNodeRadius(d) + 10));

    const link = g.append('g').attr('class', 'links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('class', 'graph-link')
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.3)
      .attr('stroke', d => {
        const src = typeof d.source === 'object' ? d.source.group : 'skill';
        return this.colors[src] || '#00d4ff';
      });

    const node = g.append('g').attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', d => `graph-node node-${d.group}`)
      .call(d3.drag()
        .on('start', (event, d) => {
          if (!event.active) this.simulation.alphaTarget(0.3).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
        .on('end', (event, d) => {
          if (!event.active) this.simulation.alphaTarget(0);
          d.fx = null; d.fy = null;
        })
      );

    // Outer glow ring (animated pulse)
    node.append('circle')
      .attr('class', 'node-glow-ring')
      .attr('r', d => this.getNodeRadius(d) + 4)
      .attr('fill', 'none')
      .attr('stroke', d => this.colors[d.group])
      .attr('stroke-opacity', 0.15)
      .attr('stroke-width', 1.5);

    // Solid dot
    node.append('circle')
      .attr('class', 'node-circle')
      .attr('r', d => this.getNodeRadius(d))
      .attr('fill', d => this.colors[d.group])
      .attr('stroke', d => d.group === 'person' ? 'rgba(255,255,255,0.6)' : 'none')
      .attr('stroke-width', d => d.group === 'person' ? 2 : 0)
      .style('filter', d => this.glows[d.group]);

    // Small semi-transparent label below each node
    node.append('text')
      .attr('class', 'node-label')
      .attr('text-anchor', 'middle')
      .attr('dy', d => this.getNodeRadius(d) + 9)
      .attr('font-size', d => d.group === 'skill' ? '7.5px' : d.group === 'person' ? '9px' : '8px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('fill', d => this.colors[d.group])
      .attr('fill-opacity', 0.55)
      .attr('pointer-events', 'none')
      .attr('font-weight', '500')
      .text(d => {
        const name = d.id;
        if (d.group === 'skill') return name.length > 16 ? name.slice(0, 14) + '…' : name;
        if (d.group === 'person') return name.split(' ').slice(0, 2).join(' ');
        return name.length > 22 ? name.slice(0, 20) + '…' : name;
      });

    node.on('mouseenter', (event, d) => this.onNodeHover(event, d, link))
        .on('mousemove', (event) => this.positionTooltip(event))
        .on('mouseleave', (event, d) => this.onNodeLeave(event, d, link))
        .on('click', (event, d) => this.onNodeClick(event, d));

    // Brownian / atomic tick
    this.simulation.on('tick', () => {
      nodes.forEach(d => {
        if (!d.fx) {
          d.vx = (d.vx || 0) + (Math.random() - 0.5) * 0.07;
          d.vy = (d.vy || 0) + (Math.random() - 0.5) * 0.07;
        }
      });
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    this.nodes = nodes;
    this.links = links;
    this.nodeSelection = node;
    this.linkSelection = link;

    // Periodic reheat to keep atoms drifting
    this._atomicTimer = setInterval(() => {
      if (this.simulation) {
        this.simulation.alpha(Math.max(this.simulation.alpha(), 0.06)).restart();
      }
    }, 3500);

    this.addPulseAnimation();
    this.setupSearch();
    this.setupFilters();
    this.setupControls();

    window.addEventListener('resize', () => this.onResize(g));
  }

  addFilters(defs) {
    const blurFilter = defs.append('filter').attr('id', 'glow');
    blurFilter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur');
    const feMerge = blurFilter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
  }

  drawStarField(container) {
    const canvas = document.getElementById('graph-stars-canvas');
    if (!canvas) return;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 1.2;
      const alpha = Math.random() * 0.6 + 0.1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    }
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 2 + 1;
      const color = Math.random() > 0.5 ? `rgba(0,212,255,0.4)` : `rgba(139,92,246,0.4)`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  addPulseAnimation() {
    const rings = document.querySelectorAll('.node-glow-ring');
    rings.forEach((ring, i) => {
      ring.style.animationDelay = `${(i * 0.25) % 3}s`;
    });
  }

  onNodeHover(event, d, link) {
    const connectedIds = new Set([d.id]);
    this.links.forEach(l => {
      const srcId = typeof l.source === 'object' ? l.source.id : l.source;
      const tgtId = typeof l.target === 'object' ? l.target.id : l.target;
      if (srcId === d.id) connectedIds.add(tgtId);
      if (tgtId === d.id) connectedIds.add(srcId);
    });

    this.nodeSelection.attr('opacity', nd => connectedIds.has(nd.id) ? 1 : 0.15);
    link.attr('stroke-opacity', l => {
      const srcId = typeof l.source === 'object' ? l.source.id : l.source;
      const tgtId = typeof l.target === 'object' ? l.target.id : l.target;
      return (srcId === d.id || tgtId === d.id) ? 0.85 : 0.04;
    }).attr('stroke-width', l => {
      const srcId = typeof l.source === 'object' ? l.source.id : l.source;
      const tgtId = typeof l.target === 'object' ? l.target.id : l.target;
      return (srcId === d.id || tgtId === d.id) ? 2 : 1;
    });

    this.showTooltip(event, d);
  }

  onNodeLeave(event, d, link) {
    this.nodeSelection.attr('opacity', 1);
    link.attr('stroke-opacity', 0.3).attr('stroke-width', 1);
    this.hideTooltip();
  }

  onNodeClick(event, d) {
    event.stopPropagation();
    this.showDetailPanel(d);
  }

  showTooltip(event, d) {
    const labels = { person: 'Person', skill: 'Skill', project: 'Project', paper: 'Paper', company: 'Company / Institution' };
    this.tooltip.innerHTML = `
      <div class="tt-badge" style="background:${this.colors[d.group]}22; border:1px solid ${this.colors[d.group]}44; color:${this.colors[d.group]}">${labels[d.group]}</div>
      <div class="tt-name">${d.id}</div>
      ${d.description ? `<div class="tt-desc">${d.description}</div>` : ''}
      <div class="tt-hint">Click for details</div>
    `;
    this.tooltip.style.display = 'block';
    this.positionTooltip(event);
  }

  positionTooltip(event) {
    const rect = document.getElementById(this.containerId).getBoundingClientRect();
    let x = event.clientX - rect.left + 15;
    let y = event.clientY - rect.top - 10;
    if (x + 220 > rect.width) x -= 230;
    if (y + 100 > rect.height) y -= 110;
    this.tooltip.style.left = x + 'px';
    this.tooltip.style.top = y + 'px';
  }

  hideTooltip() {
    this.tooltip.style.display = 'none';
  }

  showDetailPanel(d) {
    const panel = this.detailPanel;
    const color = this.colors[d.group];
    const labels = { person: 'Person', skill: 'Skill', project: 'Project', paper: 'Paper', company: 'Company' };

    let extraContent = '';
    if (d.group === 'project') {
      const proj = portfolioData.projects.find(p =>
        p.name.toLowerCase().includes(d.id.toLowerCase().split(' ')[0].toLowerCase())
      );
      if (proj) {
        extraContent = `
          <img src="${proj.image}" alt="${proj.name}" style="width:100%;border-radius:8px;margin:12px 0;object-fit:cover;max-height:160px;">
          <p style="color:#94a3b8;font-size:13px;line-height:1.6">${proj.description}</p>
          ${proj.pdf ? `<a href="${proj.pdf}" target="_blank" class="panel-btn">View Documentation</a>` : ''}
        `;
      }
    } else if (d.group === 'paper') {
      const paper = portfolioData.papers.find(p =>
        p.name.toLowerCase().includes(d.id.split(':')[0].toLowerCase()) ||
        d.id.toLowerCase().includes(p.id)
      );
      if (paper) {
        extraContent = `
          <img src="${paper.image}" alt="${paper.name}" style="width:100%;border-radius:8px;margin:12px 0;object-fit:cover;max-height:160px;">
          <p style="color:#94a3b8;font-size:13px;line-height:1.6">${paper.description}</p>
          ${paper.pdf ? `<a href="${paper.pdf}" target="_blank" class="panel-btn">Read Paper</a>` : ''}
        `;
      }
    } else if (d.group === 'company') {
      const exp = portfolioData.experience.find(e =>
        e.company.includes(d.id.split('\n')[0].split(' ')[0])
      );
      if (exp) {
        extraContent = `
          <div style="color:#94a3b8;font-size:13px;margin-top:8px"><strong style="color:#f1f5f9">${exp.role}</strong> · ${exp.period}</div>
          <ul style="margin-top:10px;padding-left:18px;color:#94a3b8;font-size:12px;line-height:1.8">
            ${exp.bullets.slice(0, 3).map(b => `<li>${b}</li>`).join('')}
          </ul>
        `;
      }
    }

    const connectedNodes = [];
    this.links.forEach(l => {
      const srcId = typeof l.source === 'object' ? l.source.id : l.source;
      const tgtId = typeof l.target === 'object' ? l.target.id : l.target;
      if (srcId === d.id) connectedNodes.push(tgtId);
      if (tgtId === d.id) connectedNodes.push(srcId);
    });

    panel.innerHTML = `
      <div class="panel-header">
        <div class="panel-badge" style="background:${color}22; border:1px solid ${color}55; color:${color}">${labels[d.group]}</div>
        <button class="panel-close" onclick="document.getElementById('graph-detail-panel').classList.remove('active')">✕</button>
      </div>
      <h3 class="panel-title" style="color:${color}">${d.id}</h3>
      ${extraContent}
      ${connectedNodes.length > 0 ? `
        <div class="panel-connections">
          <div class="panel-connections-title">Connected to</div>
          <div class="panel-tags">
            ${connectedNodes.slice(0, 8).map(n => {
              const nd = this.nodes.find(x => x.id === n);
              const nc = nd ? this.colors[nd.group] : '#00d4ff';
              return `<span class="panel-tag" style="border-color:${nc}44;color:${nc}">${n}</span>`;
            }).join('')}
          </div>
        </div>
      ` : ''}
    `;

    panel.classList.add('active');

    const connectedIds = new Set([d.id, ...connectedNodes]);
    this.nodeSelection.attr('opacity', nd => connectedIds.has(nd.id) ? 1 : 0.2);
    this.linkSelection.attr('stroke-opacity', l => {
      const srcId = typeof l.source === 'object' ? l.source.id : l.source;
      const tgtId = typeof l.target === 'object' ? l.target.id : l.target;
      return (srcId === d.id || tgtId === d.id) ? 0.8 : 0.06;
    });
  }

  setupSearch() {
    const input = document.getElementById('graph-search');
    if (!input) return;
    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        this.nodeSelection.attr('opacity', 1);
        this.linkSelection.attr('stroke-opacity', 0.3);
        return;
      }
      const matches = new Set();
      this.nodes.forEach(n => {
        if (n.id.toLowerCase().includes(q)) {
          matches.add(n.id);
          this.links.forEach(l => {
            const srcId = typeof l.source === 'object' ? l.source.id : l.source;
            const tgtId = typeof l.target === 'object' ? l.target.id : l.target;
            if (srcId === n.id) matches.add(tgtId);
            if (tgtId === n.id) matches.add(srcId);
          });
        }
      });
      this.nodeSelection.attr('opacity', nd => matches.has(nd.id) ? 1 : 0.08);
      this.linkSelection.attr('stroke-opacity', l => {
        const srcId = typeof l.source === 'object' ? l.source.id : l.source;
        const tgtId = typeof l.target === 'object' ? l.target.id : l.target;
        return (matches.has(srcId) && matches.has(tgtId)) ? 0.7 : 0.03;
      });
    });
  }

  setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = filter;

        if (filter === 'all') {
          this.nodeSelection.attr('opacity', 1);
          this.linkSelection.attr('stroke-opacity', 0.3);
        } else {
          this.nodeSelection.attr('opacity', nd => nd.group === filter ? 1 : 0.08);
          this.linkSelection.attr('stroke-opacity', l => {
            const src = typeof l.source === 'object' ? l.source : this.nodes.find(n => n.id === l.source);
            const tgt = typeof l.target === 'object' ? l.target : this.nodes.find(n => n.id === l.target);
            return (src?.group === filter || tgt?.group === filter) ? 0.6 : 0.03;
          });
        }
      });
    });
  }

  setupControls() {
    document.getElementById('zoom-in')?.addEventListener('click', () => {
      this.svg.transition().duration(300).call(this.zoom.scaleBy, 1.4);
    });
    document.getElementById('zoom-out')?.addEventListener('click', () => {
      this.svg.transition().duration(300).call(this.zoom.scaleBy, 0.7);
    });
    document.getElementById('zoom-reset')?.addEventListener('click', () => {
      this.svg.transition().duration(400).call(this.zoom.transform, d3.zoomIdentity);
    });

    this.svg.on('click', () => {
      this.detailPanel.classList.remove('active');
      this.nodeSelection.attr('opacity', 1);
      this.linkSelection.attr('stroke-opacity', 0.3);
    });
  }

  onResize(g) {
    const container = document.getElementById(this.containerId);
    if (!container) return;
    this.width = container.clientWidth;
    this.height = container.clientHeight;
    this.simulation.force('center', d3.forceCenter(this.width / 2, this.height / 2));
    this.simulation.alpha(0.3).restart();
    this.drawStarField(container);
  }

  destroy() {
    if (this.simulation) this.simulation.stop();
    if (this._atomicTimer) clearInterval(this._atomicTimer);
  }
}

let graphInstance = null;

function initGraph() {
  if (graphInstance) graphInstance.destroy();
  graphInstance = new SkillGraph('graph-container');
  graphInstance.init();
}
