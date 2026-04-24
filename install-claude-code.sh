#!/usr/bin/env bash
# Install Brain of Barkley as a Claude Code user-level skill.
# Unofficial. Not affiliated with Russell Barkley.
set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/skill"
TARGET_DIR="${HOME}/.claude/skills/barkley"
CONSULT_DIR="${HOME}/.barkley/consultations"

echo "Brain of Barkley — Claude Code installer"
echo "  source: ${SOURCE_DIR}"
echo "  target: ${TARGET_DIR}"

if [[ -d "${TARGET_DIR}" ]]; then
  read -r -p "Target exists. Overwrite? [y/N] " r
  [[ "${r}" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }
  rm -rf "${TARGET_DIR}"
fi

mkdir -p "${TARGET_DIR}" "${CONSULT_DIR}"
rsync -av --exclude='.git' --exclude='.DS_Store' "${SOURCE_DIR}/" "${TARGET_DIR}/"

echo
echo "Installed."
echo "  Skill:  ${TARGET_DIR}/SKILL.md"
echo "  Brain:  ${TARGET_DIR}/brain/"
echo "  Logs:   ${CONSULT_DIR}/"
echo
echo "Reload Claude Code or start a new session. Trigger:"
echo "  barkley <질문>   |   바클리한테 물어봐 <질문>"
