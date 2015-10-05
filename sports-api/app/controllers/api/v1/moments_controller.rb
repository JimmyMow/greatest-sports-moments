# include ActiveModel::Serialization
class Api::V1::MomentsController < Api::V1::BaseController
  def show
   moment = Moment.find(params[:id])

   render(json: MomentSerializer.new(moment).to_json)
  end

  def rand
   # moment = Moment.limit(params[:num]).order("RANDOM ()").first
   # render(json: MomentSerializer.new(moment).to_json)
   @moments = Moment.order("RANDOM ()").limit(params[:num].to_i)
   puts "moment count: #{@moments.count}"

   render(json: ActiveModel::ArraySerializer.new(@moments, each_serializer: MomentSerializer).to_json)
  end
end
