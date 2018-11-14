class Api::V1::GamesController < ApplicationController
  before_action :find_game, only: [:update]

  def index
    @games = Game.all
    render json: @games, status: :ok
  end

  def create
    @game = Game.create(game_params)
    render json: @game, status: :created
  end

  def update
    @game.update(game_params)
    if @game.save
      render json: @game, status: :accepted
    else
      render json: { errors: @game.error.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def game_params
    params.permit(:user_id, :score)
  end

  def find_game
    @game = Game.find(params[:id])
  end
end
