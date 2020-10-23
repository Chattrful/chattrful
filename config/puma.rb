if Rails.env.production?
  #!/usr/bin/env puma
  directory '/var/apps/chattrful/current'
  rackup "/var/apps/chattrful/current/config.ru"
  environment 'production'

  pidfile "/var/apps/chattrful/shared/tmp/pids/puma.pid"
  state_path "/var/apps/chattrful/shared/tmp/pids/puma.state"
  stdout_redirect '/var/apps/chattrful/current/log/puma.access.log', '/var/apps/chattrful/current/log/puma.error.log', true

  threads 4,16

  bind 'unix:///var/apps/chattrful/shared/tmp/sockets/chattrful-puma.sock'

  workers 0

  restart_command 'bundle exec puma'

  preload_app!

  on_restart do
    puts 'Refreshing Gemfile'
    ENV["BUNDLE_GEMFILE"] = "/var/apps/chattrful/current/Gemfile"
  end

  before_fork do
    ActiveRecord::Base.connection_pool.disconnect!
  end

  on_worker_boot do
    ActiveSupport.on_load(:active_record) do
      ActiveRecord::Base.establish_connection
    end
  end
else
  # Puma can serve each request in a thread from an internal thread pool.
  # The `threads` method setting takes two numbers: a minimum and maximum.
  # Any libraries that use thread pools should be configured to match
  # the maximum value specified for Puma. Default is set to 5 threads for minimum
  # and maximum; this matches the default thread size of Active Record.
  #
  max_threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
  min_threads_count = ENV.fetch("RAILS_MIN_THREADS") { max_threads_count }
  threads min_threads_count, max_threads_count

  # Specifies the `port` that Puma will listen on to receive requests; default is 3000.
  #
  port ENV.fetch("PORT") { 3000 }

  # Specifies the `environment` that Puma will run in.
  #
  environment ENV.fetch("RAILS_ENV") { "development" }

  # Specifies the `pidfile` that Puma will use.
  pidfile ENV.fetch("PIDFILE") { "tmp/pids/server.pid" }

  # Specifies the number of `workers` to boot in clustered mode.
  # Workers are forked web server processes. If using threads and workers together
  # the concurrency of the application would be max `threads` * `workers`.
  # Workers do not work on JRuby or Windows (both of which do not support
  # processes).
  #
  # workers ENV.fetch("WEB_CONCURRENCY") { 2 }

  # Use the `preload_app!` method when specifying a `workers` number.
  # This directive tells Puma to first boot the application and load code
  # before forking the application. This takes advantage of Copy On Write
  # process behavior so workers use less memory.
  #
  # preload_app!

  # Allow puma to be restarted by `rails restart` command.
  plugin :tmp_restart
end
