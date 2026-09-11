---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: 11ba44d71df2f37bd52fa0370808e909_af67223fad8e11f18f50525400aeaaa3
    ReservedCode1: lOuUx2CItX56w1CZkmvt9h2rzocfS+ReRmnbkF3pYOX4bxeYe9VwttmlwsfuYuZubRd8u75meqEfPzI9Q7MyMvDL3odTtbY7nu9juYNp0lbXnLA3iJ/FHRQfqXqQBXnyh6+um/isfF0UTzQc/AOM93e3FImh+WRKAmq/EUoRtoqrYL+HhUsnTIxXDuY=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: 11ba44d71df2f37bd52fa0370808e909_af67223fad8e11f18f50525400aeaaa3
    ReservedCode2: lOuUx2CItX56w1CZkmvt9h2rzocfS+ReRmnbkF3pYOX4bxeYe9VwttmlwsfuYuZubRd8u75meqEfPzI9Q7MyMvDL3odTtbY7nu9juYNp0lbXnLA3iJ/FHRQfqXqQBXnyh6+um/isfF0UTzQc/AOM93e3FImh+WRKAmq/EUoRtoqrYL+HhUsnTIxXDuY=
---



# Jeff Ge - Personal Homepage

A single-page English CV / portfolio website for job applications, built on the
[AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io) Jekyll template
(MIT licensed, by RayeRen).

## Sections

About Me - Experience - Projects - Skills - Education - Awards - Contact

All content is taken from the author's CV. Academic sections, academic icon fonts,
formula rendering and all related scripts/styles have been removed.

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000/JeffGe.github.io/>. The site is served under the
`baseurl` path configured in `_config.yml`, so do not drop it from the local URL.

## Deploy to GitHub Pages

- Repository: `chloceg/JeffGe.github.io` - a **project** site, therefore it is
  published under the `JeffGe.github.io` sub-path of the user site
  `chloceg.github.io`.
- Push the contents of this folder to the `main` branch.
- In the repository, go to `Settings -> Pages` and set the source to the
  `main` branch (root folder).
- The site is published at <https://chloceg.github.io/JeffGe.github.io/>.

`_config.yml` must keep this deployment identity:

```yaml
url        : "https://chloceg.github.io"
baseurl    : "/JeffGe.github.io"
repository : "chloceg/JeffGe.github.io"
```

All internal links are generated at build time - navigation/masthead anchors via
Liquid's `relative_url` filter and the CV download via `{{ site.baseurl }}` - so
anchors, CSS, JS, web fonts, favicons and the CV PDF all resolve correctly under
this sub-path. If the repository is ever renamed, update `baseurl` (and the
`site.url` + `baseurl` pair used by the canonical link) accordingly.

## Notes

- Deployment identity (project site under a sub-path) is defined in `_config.yml`
  by the `url` + `baseurl` pair; every internal link is built on top of it.
- `Gemfile` keeps `wdm` (Windows file-watching) and `hawkins` (live preview used by
  `run_server.sh`) for local development only. Neither is used by GitHub Pages - if
  a Pages build ever reports an unsupported gem, delete those two lines.
- Social links (GitHub / LinkedIn / Twitter / Website) are intentionally left
  blank in `_config.yml` because they are not present in the CV. Fill in
  `author.github`, `author.linkedin`, `author.twitter` or `author.uri` if needed.
- Replace `images/android-chrome-512x512.png` and the favicons in `images/`
  with your own photo / icon if desired.
*（内容由AI生成，仅供参考）*
*（内容由AI生成，仅供参考）*
