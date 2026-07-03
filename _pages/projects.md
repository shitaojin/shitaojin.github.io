---
layout: page
title: Research
permalink: /projects/
description: Research themes in AI-enabled architectural programming, megaproject governance, human-centered urban evaluation, learning environments, and architectural education.
nav: true
nav_order: 5
horizontal: true
---

<div class="research-overview">
  <p>
    My research treats architectural programming as an evidence-based decision system that can connect stakeholder values,
    computational intelligence, public concerns, and design outcomes. The work is organized around five research themes,
    each linking methods, empirical cases, and publications.
  </p>
</div>

<div class="research-theme-pills" aria-label="Research themes">
  <span>Collective intelligence</span>
  <span>Megaproject governance</span>
  <span>Child-friendly communities</span>
  <span>Learning environments</span>
  <span>AI-enabled teaching</span>
</div>

<!-- pages/projects.md -->
<div class="projects research-theme-grid">
  {% assign sorted_projects = site.projects | sort: "importance" %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
      {% for project in sorted_projects %}
        {% include projects_horizontal.liquid %}
      {% endfor %}
    </div>
  </div>
</div>
