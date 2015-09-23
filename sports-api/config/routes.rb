Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "/moments/rand" => "moments#rand"
      resources :moments, only: [:show]
    end
  end
end
