Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show, :create, :update]
      resources :games, only: [:index, :create, :update]
    end
  end
end
