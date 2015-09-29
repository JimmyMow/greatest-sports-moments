Rails.application.routes.draw do
   resources :moments, only: [:new, :create]
   namespace :api do
    namespace :v1 do
      get "/moments/rand" => "moments#rand"
      resources :moments, only: [:show]
    end
   end
end
