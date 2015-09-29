class MomentsController < ApplicationController
   def new
      @moment = Moment.new
   end

   def create
      @moment = Moment.new(moment_params)

      respond_to do |format|
         if @moment.save
           format.html { redirect_to new_moment_url, notice: 'Note was successfully created.' }
         else
           format.html { render :new }
           format.json { render json: @moment.errors, status: :unprocessable_entity }
         end
      end
   end

private
   def moment_params
      params.require(:moment).permit(:ytid)
   end
end
