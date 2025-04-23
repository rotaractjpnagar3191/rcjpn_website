---
layout: team
title: Team
permalink: /team/
---

<h1>Our Team</h1>
{% for member in site.team %}
  <div class="team-member">
    <img src="{{ member.image }}" alt="{{ member.name }}">
    <h3>{{ member.name }}</h3>
    <p>{{ member.role }}</p>
    <p>{{ member.bio }}</p>
  </div>
{% endfor %}
