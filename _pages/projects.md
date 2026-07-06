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
        <div class="col mb-4">
          <a
            class="research-theme-card-link"
            href="{% if project.redirect %}{{ project.redirect }}{% else %}{{ project.url | relative_url }}{% endif %}"
            aria-label="Open research theme: {{ project.title | escape }}"
          >
            <article class="card h-100 hoverable research-theme-card">
              {% if project.img %}
                <figure class="research-theme-card__media">
                  <img src="{{ project.img | relative_url }}" alt="{{ project.title | escape }} thumbnail" loading="lazy">
                </figure>
              {% endif %}
              <div class="card-body research-theme-card__body">
                <h3 class="card-title">{{ project.title }}</h3>
                <p class="card-text">{{ project.description }}</p>
              </div>
            </article>
          </a>
        </div>
      {% endfor %}
    </div>
  </div>
</div>
