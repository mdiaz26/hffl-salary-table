# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Franchise.destroy_all
Player.destroy_all

VA = Franchise.create(owners: "Andrew Hua", nickname: "H.W.A", location: "Virginia")
GK = Franchise.create(owners: "Dustin Kim, Matt Glantz", nickname: "Sky Elephants", location: "Great Kills")
LIC = Franchise.create(owners: "Warren Li", nickname: "Grundel Monkeys", location: "LIC")
NE = Franchise.create(owners: "Wankyu Lee", nickname: "Kingfishers", location: "New England")
MARS = Franchise.create(owners: "John Lim, Josh Vogt", nickname: "Achilles Last Stand", location: "Mars")
HAR = Franchise.create(owners: "Mike Diaz, Danny Kimeldorf", nickname: "Globe Trodgers", location: "Harlem")
FLU = Franchise.create(owners: "Andrew Chu", nickname: "Bobbies", location: "Flushing")
CR = Franchise.create(owners: "Ken Jin", nickname: "Kamara Sutra", location: "Capital Region")
OAK = Franchise.create(owners: "Doho Sung", nickname: "Bird Gang", location: "Oakland")
YON = Franchise.create(owners: "Jae Eom, Kawin Rattanakorn", nickname: "Honky-Tonkers", location: "Yonkers")

string_translation = {
    "NE" => NE,
    "GK" => GK,
    "VA" => VA,
    "YON" => YON,
    "OAK" => OAK,
    "CR" => CR,
    "FLU" => FLU,
    "HAR" => HAR,
    "MARS" => MARS,
    "LIC" =>LIC,

}

require 'csv'

csv_text = File.read(Rails.root.join('lib', 'seeds', 'Fantrax-Players-Hunter-Fantasy-Football-League.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
    p = Player.new
    p.name = row['Player']
    p.nfl_team = row['Team']
    p.position = row['Position']
    p.salary = row['Salary']
    p.franchise = string_translation[row['Status']]
    p.contract = row['Contract']
    p.save
end

puts "There are now #{Player.count} rows in the players table"