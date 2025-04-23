---
layout: projects
title: Projects
permalink: /projects/
---

<h1>Our Projects</h1>
{% for project in site.projects %}
  <div class="project">
    <img src="{{ project.image }}" alt="{{ project.title }}">
    <h3>{{ project.title }}</h3>
    <p>{{ project.date | date: "%B %d, %Y" }}</p>
    <p>{{ project.description }}</p>
  </div>
{% endfor %}
