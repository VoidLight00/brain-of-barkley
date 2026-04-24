#!/usr/bin/env bash
# Install the Barkley skill into Claude Code's user-level skill directory.
# Unofficial. Not affiliated with Russell Barkley.

set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="${HOME}/.claude/skills/barkley"
CONSULT_DIR="${HOME}/.barkley/consultations"

echo "Barkley skill installer"
echo "  source: ${SOURCE_DIR}"
echo "  target: ${TARGET_DIR}"
echo "  consultations: ${CONSULT_DIR}"
echo

if [[ -d "${TARGET_DIR}" ]]; then
  read -r -p "Target already exists. Overwrite? [y/N] " reply
  if [[ ! "${reply}" =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
  fi
  rm -rf "${TARGET_DIR}"
fi

mkdir -p "${TARGET_DIR}"
mkdir -p "${CONSULT_DIR}"

# Copy everything except the installer itself and VCS noise
rsync -av \
  --exclude='install.sh' \
  --exclude='.git' \
  --exclude='.DS_Store' \
  "${SOURCE_DIR}/" "${TARGET_DIR}/"

echo
echo "Installed."
echo "  Skill: ${TARGET_DIR}/SKILL.md"
echo "  Brain: ${TARGET_DIR}/brain/"
echo "  Consultations will save to: ${CONSULT_DIR}/"
echo
echo "Reload Claude Code or start a new session to pick up the skill."
echo "Trigger it with: barkley <질문> | 바클리한테 물어봐 <질문>"
