#!/usr/bin/env ruby

require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }
  gem 'procon_bypass_man', github: 'splaspla-hacker/procon_bypass_man', branch: "edge"
  gem 'procon_bypass_man-web', github: 'splaspla-hacker/procon_bypass_man-web'
end

ProconBypassMan::Web::Server.start
