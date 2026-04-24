#!/usr/bin/env bash
# Install Brain of Barkley as an OpenClaw skill.
# OpenClaw uses the Claude Code skill format under ~/.openclaw/skills/.
# Unofficial. Not affiliated with Russell Barkley.
set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/skill"
TARGET_DIR="${HOME}/.openclaw/skills/barkley"
CONSULT_DIR="${HOME}/.barkley/consultations"

echo "Brain of Barkley — OpenClaw installer"
echo "  source: ${SOURCE_DIR}"
echo "  target: ${TARGET_DIR}"

# Sanity-check that OpenClaw is set up
if [[ ! -d "${HOME}/.openclaw" ]]; then
  echo "ERROR: ~/.openclaw not found. Install OpenClaw first."
  exit 1
fi

if [[ -d "${TARGET_DIR}" ]]; then
  read -r -p "Target exists. Overwrite? [y/N] " r
  [[ "${r}" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }
  rm -rf "${TARGET_DIR}"
fi

mkdir -p "${TARGET_DIR}" "${CONSULT_DIR}"
rsync -av --exclude='.git' --exclude='.DS_Store' "${SOURCE_DIR}/" "${TARGET_DIR}/"

echo
echo "Installed into OpenClaw."
echo "  Skill:  ${TARGET_DIR}/SKILL.md"
echo "  Brain:  ${TARGET_DIR}/brain/"
echo "  Logs:   ${CONSULT_DIR}/"
echo
echo "Trigger from OpenClaw chat (Telegram or direct):"
echo "  /barkley <질문>   |   바클리한테 물어봐 <질문>"
