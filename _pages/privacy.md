---
title: "Privacy"
permalink: /privacy/
sitemap: false
author_profile: false
---

This site is a personal CV. A visitor counter (Vercount) may record aggregate unique visitors and page views.

{% if site.statcounter_project and site.statcounter_security %}
If Statcounter is enabled, their tracker records your IP address, coarse location / ISP, browser, pages viewed, and referrer. That data is stored by [Statcounter](https://statcounter.com/) (not on GitHub Pages) so the site owner can see who opened this CV. Statcounter's free plan keeps recent visitor activity for a limited time (currently 14 days).

{% endif %}
{% if site.visitor_log_url %}
If the private IP log is enabled, a request is sent to a Cloudflare Worker when you open a page. The Worker stores:

- IP address (from the connection, not typed into the page)
- coarse location Cloudflare already has (country / city)
- page path, referrer, browser language, and user agent
- time of the visit

Logs are kept for 90 days on that Worker. They are not published on GitHub Pages. They are used only to see who opened this CV.

{% endif %}
If you want a record removed, email [{{ site.author.email }}](mailto:{{ site.author.email }}).
