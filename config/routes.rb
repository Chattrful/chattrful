Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: "users/registrations"
  }

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :ajax do
    # visitor_accounts == account
    namespace :visitor do
      post "/accounts/:id",
        to: "accounts#create",
        as: "accounts",
        constraints: {format: "js"}

      resources :accounts, only: [] do
        resources :conversations, only: [] do
          resources :messages, only: [:index, :create], constraints: {format: "js"}
        end
      end
    end

    resources :conversations, only: [], constraints: {format: "js"} do
      resources :messages, only: [:index, :create], constraints: {format: "js"}
    end
  end

  resources :conversations, only: []
  resource :metronic, controller: "metronic", only: :show

  resources :visitor_conversations, only: :show
  root to: "conversations#index"
end
