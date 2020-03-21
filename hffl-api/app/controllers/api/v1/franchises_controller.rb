class Api::V1::FranchisesController < ApplicationController

    def index
        franchises = Franchise.all
        render json: franchises
    end

    def show
        franchise = Franchise.find(params[:id])
        render json: franchise, include: :players
    end

end
