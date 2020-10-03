Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :ajax do
    resources :conversations, only: :show do
      resources :messages, only: :create, constraints: {format: "js"}
    end
  end

  resources :conversations
  resource :metronic, controller: "metronic", only: :show

  root to: "conversations#index"
end
