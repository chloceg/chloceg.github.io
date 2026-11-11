---
title: "Jeff Ge"
permalink: /
description: "AI Architect & Engineer with 3+ years of industry experience driving AI transformation through LLMs, graph analytics, and NLP."
---

{% assign cv = site.data.cv %}

<h1 id="about-me">About Me</h1>

<ul>
{% for item in cv.summary %}
  <li>{{ item | markdownify | replace: '<p>', '' | replace: '</p>', '' }}</li>
{% endfor %}
</ul>

{% if cv.highlights %}
<ul class="cv-highlights">
  {% for item in cv.highlights %}
  <li>{{ item }}</li>
  {% endfor %}
</ul>
{% endif %}

<h1 id="experience">Experience</h1>

{% for job in cv.experience %}
<div class="cv-item">
  <h2>{{ job.company }}</h2>
  <p class="cv-meta"><span class="cv-role">{{ job.title }}</span><span class="cv-dates">{{ job.start }} – {{ job.end }}{% if job.location %} · {{ job.location }}{% endif %}</span></p>
  <ul>
  {% for bullet in job.bullets %}
    <li>{{ bullet | markdownify | replace: '<p>', '' | replace: '</p>', '' }}</li>
  {% endfor %}
  </ul>
</div>
{% endfor %}

<h1 id="projects">Projects</h1>

{% for project in cv.projects %}
<div class="cv-item">
  <h2>{{ project.name }}</h2>
  <p class="cv-meta"><span class="cv-role">{{ project.role }}</span><span class="cv-dates">{{ project.start }} – {{ project.end }}</span></p>
  <ul>
  {% for bullet in project.bullets %}
    <li>{{ bullet | markdownify | replace: '<p>', '' | replace: '</p>', '' }}</li>
  {% endfor %}
  </ul>
</div>
{% endfor %}

<h1 id="skills">Skills</h1>

<ul>
{% for group in cv.skills %}
  <li><strong>{{ group.name }}</strong>: {{ group.items | join: ", " }}</li>
{% endfor %}
</ul>

<h1 id="education">Education</h1>

{% for school in cv.education %}
<div class="cv-item">
  <h2>{{ school.school }}</h2>
  <p class="cv-meta"><span class="cv-role">{{ school.degree }}</span><span class="cv-dates">{{ school.start }} – {{ school.end }}{% if school.location %} · {{ school.location }}{% endif %}</span></p>
  {% if school.notes %}
  <ul>
    <li>{{ school.notes }}</li>
  </ul>
  {% endif %}
</div>
{% endfor %}

<h1 id="awards">Awards</h1>

<ul>
{% for award in cv.awards %}
  <li><strong>{{ award.name }}</strong> — {{ award.detail }} ({{ award.date }})</li>
{% endfor %}
</ul>

<h1 id="contact">Contact</h1>

<ul>
  <li><strong>Email</strong>: <a href="mailto:{{ cv.email }}">{{ cv.email }}</a></li>
  <li><strong>Phone</strong>: <a href="tel:{{ cv.phone | replace: ' ', '' }}">{{ cv.phone }}</a></li>
  <li><strong>GitHub</strong>: <a href="https://github.com/{{ cv.github }}">github.com/{{ cv.github }}</a></li>
  <li><strong>Website</strong>: <a href="{{ cv.website }}">{{ cv.website | replace: 'https://', '' }}</a></li>
  <li><strong>CV (PDF)</strong>: <a href="{{ cv.pdf | relative_url }}">Download CV</a></li>
</ul>
