#!/usr/bin/env python3
"""Render README.md from _data/cv.yml so the GitHub repo is the resume."""

from __future__ import annotations

from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
CV_PATH = ROOT / "_data" / "cv.yml"
README_PATH = ROOT / "README.md"


def load_cv() -> dict:
    with CV_PATH.open(encoding="utf-8") as fh:
        return yaml.safe_load(fh)


def md_join(items) -> str:
    return "\n".join(f"- {item}" for item in items)


def render(cv: dict) -> str:
    website = cv["website"].rstrip("/")
    pdf_url = website + cv["pdf"]
    github_url = f"https://github.com/{cv['github']}"
    photo = "images/android-chrome-512x512.png"
    last_updated = cv["last_updated"]
    year = str(last_updated)[:4]

    status = " · Open to opportunities" if cv.get("open_to_work") else ""
    highlights = ""
    if cv.get("highlights"):
        chips = " · ".join(cv["highlights"])
        highlights = f"\n{chips}\n"

    summary = md_join(cv["summary"])

    experience_blocks = []
    for job in cv["experience"]:
        loc = f" · {job['location']}" if job.get("location") else ""
        bullets = md_join(job["bullets"])
        experience_blocks.append(
            f"### {job['company']}\n"
            f"*{job['title']} · {job['start']} – {job['end']}{loc}*\n\n"
            f"{bullets}"
        )
    experience = "\n\n".join(experience_blocks)

    project_blocks = []
    for project in cv["projects"]:
        bullets = md_join(project["bullets"])
        project_blocks.append(
            f"### {project['name']}\n"
            f"*{project['role']} · {project['start']} – {project['end']}*\n\n"
            f"{bullets}"
        )
    projects = "\n\n".join(project_blocks)

    skills = md_join(
        f"**{group['name']}**: {', '.join(group['items'])}"
        for group in cv["skills"]
    )

    education_blocks = []
    for school in cv["education"]:
        loc = f" · {school['location']}" if school.get("location") else ""
        notes = f"\n- {school['notes']}" if school.get("notes") else ""
        education_blocks.append(
            f"### {school['school']}\n"
            f"*{school['degree']} · {school['start']} – {school['end']}{loc}*"
            f"{notes}"
        )
    education = "\n\n".join(education_blocks)

    awards = md_join(
        f"**{award['name']}** — {award['detail']} ({award['date']})"
        for award in cv["awards"]
    )

    phone_tel = cv["phone"].replace(" ", "")
    host = website.replace("https://", "")
    github_host = github_url.replace("https://", "")

    return f"""<img src="{photo}" alt="{cv['name']}" width="160" align="right" />

# {cv['name']}

**{cv['headline']}** · {cv['location']}{status}

[{host}]({website}) ·
[PDF CV]({pdf_url}) ·
[{cv['email']}](mailto:{cv['email']}) ·
[GitHub]({github_url}) ·
[{cv['phone']}](tel:{phone_tel})
{highlights}
这是我的个人简历仓库。网页版：[{host}]({website}) ，PDF：[Download CV]({pdf_url})。

## About Me

{summary}

## Experience

{experience}

## Projects

{projects}

## Skills

{skills}

## Education

{education}

## Awards

{awards}

## Contact

- **Email**: [{cv['email']}](mailto:{cv['email']})
- **Phone**: [{cv['phone']}](tel:{phone_tel})
- **GitHub**: [{github_host}]({github_url})
- **Website**: [{host}]({website})
- **CV (PDF)**: [Download CV]({pdf_url})

---

*Last updated {last_updated} (Asia/Shanghai). © {year} {cv['name']}.*

<details>
<summary>How this resume repo is maintained</summary>

Content lives in <code>_data/cv.yml</code>. After editing it, run:

<pre>python3 scripts/render_readme.py</pre>

That regenerates this README. The GitHub Pages site at {website} reads the same YAML through Jekyll (<code>_pages/about.md</code>). Preview locally with <code>./run_server.sh</code>.
</details>
"""


def main() -> None:
    readme = render(load_cv())
    README_PATH.write_text(readme, encoding="utf-8")
    print(f"Wrote {README_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
