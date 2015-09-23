# include ActiveModel::Serialization
class Api::V1::MomentsController < Api::V1::BaseController
  def show
   moment = Moment.find(params[:id])

   render(json: MomentSerializer.new(moment).to_json)
  end

  def rand
   moment = Moment.limit(1).order("RANDOM ()").first

   render(json: MomentSerializer.new(moment).to_json)
  end
end
