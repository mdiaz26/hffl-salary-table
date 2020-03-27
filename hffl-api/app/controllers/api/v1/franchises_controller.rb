class Api::V1::FranchisesController < ApplicationController

    def index
        franchises = Franchise.all
        render json: franchises, except: [:created_at, :updated_at]
    end

    def show
        franchise = Franchise.find(params[:id])
        render json: franchise, include: {:players => {except: [:created_at, :updated_at]}}, except: [:created_at, :updated_at]
    end

end
