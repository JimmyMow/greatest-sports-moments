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

   def update
      @moment = Moment.find(params[:id])
      respond_to do |format|
      if @moment.update(moment_params)
        format.html { redirect_to @moment, notice: 'moment was successfully updated.' }
        format.json { render :show, status: :ok, location: @moment }
        format.js
      else
        format.html { render :edit }
        format.json { render json: @moment.errors, status: :unprocessable_entity }
      end
    end
   end

private
   def moment_params
      params.require(:moment).permit(:ytid, :description, :wiki)
   end
end
