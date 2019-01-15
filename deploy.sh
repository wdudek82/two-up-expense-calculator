#!/usr/bin/env bash

npm run build
tar czf build.tgz build/*
scp build.tgz expense@helios-2:~
rm -r build
rm build.tgz

ssh -t expense@helios-2 << 'ENDSSH'
  rm -rf app
  mkdir app
  tar xzf build.tgz -C app
  rm build.tgz
ENDSSH
