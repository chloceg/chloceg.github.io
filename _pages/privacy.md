---
title: "Privacy"
permalink: /privacy/
sitemap: false
author_profile: false
---

This site is a personal CV. A visitor counter (Vercount) may record aggregate unique visitors and page views.

{% if site.visitor_log_url %}
If the IP log is enabled, a request is sent to a private Cloudflare Worker when you open a page. The Worker stores:

- IP address (from the connection, not typed into the page)
- coarse location Cloudflare already has (country / city)
- page path, referrer, browser language, and user agent
- time of the visit

Logs are kept for 90 days on that Worker. They are not published on GitHub Pages. They are used only to see who opened this CV.

{% endif %}
If you want a record removed, email [{{ site.author.email }}](mailto:{{ site.author.email }}).
