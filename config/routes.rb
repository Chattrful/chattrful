Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resource :metronic, controller: 'metronic', only: :show

  root to: 'home#index'
end
