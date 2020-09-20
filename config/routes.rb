Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :conversations
  resource :metronic, controller: 'metronic', only: :show

  root to: 'conversations#index'
end
