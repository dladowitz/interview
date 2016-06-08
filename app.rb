require 'bundler/setup'
require 'haml'
require 'httparty'
require 'pry'
require 'sinatra'


# Changing to use HAML, since I know that better than ERB
set :haml, :format => :html5

get '/' do
  # Pull movies out of favorite list
  # Create an array of favorite movie ids. Used in the view to check whether a movie is already favorited
  favorite_movies = JSON.parse(File.read('data.json'))
  @favorite_ids = favorite_movies.map{|movie| movie["oid"]}

  if params[:title]
    search_query = params[:title]
    search_query = search_query.gsub(" ", "+") # fix whitespace so it doesn't break the query

    # Make a call to the omdb api
    omdb_response = HTTParty.get("http://www.omdbapi.com/?s=#{search_query}")
    omdb_hash_response = JSON.parse(omdb_response.body)

    # create a list of movies to pass onto the view
    @movies_array = omdb_hash_response["Search"]
  end

  # calls the index view
  haml :index
end

# Reads all the stored favorites and sends back as json
get '/favorites' do
  response.header['Content-Type'] = 'application/json'
  File.read('data.json')
end

# Clears out stored favorites
get '/delete_favorites' do
  File.write('data.json', "[]")
  "data.json file cleared."
end

# Adds to stored favorites
post '/favorites' do
  file = JSON.parse(File.read('data.json'))
  unless params[:name] && params[:oid]
    return 'Invalid Request'
  end
  movie = { name: params[:name], oid: params[:oid] }

  file << movie
  File.write('data.json',JSON.pretty_generate(file))
  movie.to_json
end
