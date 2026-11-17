# Contributing

This repository contains the Velune creative-studio website.

## Local setup

~~~bash
npm ci
npm run dev
~~~

Use an active LTS Node.js version. Do not edit the lockfile manually; use npm when dependencies change.

## Before opening a pull request

Run:

~~~bash
npm run lint
npm run build
~~~

Also check responsive layouts, keyboard interaction, meaningful image alternative text, reduced-motion behavior, and the browser console.

## Content and asset rules

- Preserve the established Velune visual identity and content structure.
- Confirm permission before adding client names, photographs, videos, or private project material.
- Do not add personal information, access tokens, API keys, or production environment values.
- Keep secrets in the hosting provider's environment settings; never commit .env files.

## Pull requests

Explain the user-visible impact, list the checks run, and include before/after screenshots for design changes.
