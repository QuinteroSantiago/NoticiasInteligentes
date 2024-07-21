#!/bin/bash

# Check if there are tags; if not, use the first commit as the starting point
if git describe --tags --abbrev=0 >/dev/null 2>&1; then
  LAST_TAG=$(git describe --tags --abbrev=0)
else
  LAST_TAG=$(git rev-list --max-parents=0 HEAD)
fi

# Generate a diff from the last tag to HEAD
GIT_DIFF=$(git diff $LAST_TAG HEAD)

# Generate a commit log
COMMIT_LOG=$(git log $LAST_TAG..HEAD --oneline)

# Combine the diff and commit messages
CONTENT="Commit Log:$(\n)
$COMMIT_LOG"

# Output the description for potential use
{
  echo 'description<<EOF'
  $COMMIT_LOG
  echo EOF
} >>"${GITHUB_ENV}"
