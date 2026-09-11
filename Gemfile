source "https://rubygems.org"

# The site is built by GitHub Actions (.github/workflows/jekyll.yml).
#
# We build with Jekyll 4 directly instead of the github-pages gem: that gem pins
# Jekyll to 3.10 and locks every plugin to an exact version (jekyll-feed = 0.17.0,
# jekyll-sitemap = 1.4.0, ...), which is what produced
# "The github-pages gem can't satisfy your Gemfile's dependencies".
gem "jekyll", "~> 4.4"

group :jekyll_plugins do
  gem "jekyll-feed"           # Atom feed
  gem "jekyll-sitemap"        # sitemap.xml
  gem "jekyll-gist"           # {% gist %} Liquid tag
  gem "jekyll-redirect-from"  # redirect_from / redirect_to front matter
end
# jekyll-paginate is intentionally absent: it was dropped upstream in favour of
# jekyll-paginate-v2, and this site has no _posts collection and no `paginator`
# calls anywhere, so nothing needs it.
# jemoji is likewise unused (no {% jemoji %} tag in the templates).

# Windows-only helpers. Scoping by `platforms:` keeps them off macOS/Linux, unlike
# the old `if Gem.win_platform?` guard which leaked into the lockfile.
# tzinfo-data supplies the Asia/Hong_Kong zone data Windows itself lacks.
gem "wdm", "~> 0.1.0", platforms: [:mswin, :mingw, :x64_mingw]
gem "tzinfo-data", platforms: [:mswin, :mingw, :x64_mingw]
