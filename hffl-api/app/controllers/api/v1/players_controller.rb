class Api::V1::PlayersController < ApplicationController

    def index
        players = Player.all
        render json: players, except: [:created_at, :updated_at]
    end

end
