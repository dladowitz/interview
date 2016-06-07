require 'bundler/setup'
require 'haml'
require 'httparty'
require 'pry'
require 'sinatra'


# Changing to use HAML, since I know that better than ERB
set :haml, :format => :html5

get '/' do
  if params[:title]
    search_query = params[:title]
    search_query = search_query.gsub(" ", "+")

    omdb_response = HTTParty.get("http://www.omdbapi.com/?s=#{search_query}")

    omdb_hash_response = JSON.parse(omdb_response.body)
    @movies_array = omdb_hash_response["Search"]
  end

  haml :index
end

get 'favorites' do
  response.header['Content-Type'] = 'application/json'
  File.read('data.json')
end

get '/favorites' do
  file = JSON.parse(File.read('data.json'))
  unless params[:name] && params[:oid]
    return 'Invalid Request'
  end
  movie = { name: params[:name], oid: params[:oid] }
  file << movie
  File.write('data.json',JSON.pretty_generate(file))
  movie.to_json
end
