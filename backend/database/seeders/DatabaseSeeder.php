<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\SlaughterHeadMeatMidriff;
use App\Models\User;
use App\Models\Fruits;
use App\Models\LabInputs;
use App\Models\DrillSample;
use App\Models\Translations;
use App\Models\FruitProduction;
use Illuminate\Database\Seeder;
use App\Models\DeviationComplaint;
use App\Models\DrillSampleAnimals;
use App\Models\DrillSampleProducts;
use Database\Factories\UserFactory;
use App\Models\FruitProductionCauses;
use App\Models\DeviationComplaintSections;
use App\Models\FruitProductionStatusTypes;
use App\Models\DeviationComplaintLineTypes;
use App\Models\DeviationComplaintRemarkTypes;
use App\Models\FruitProductionDeviationTypes;
use App\Models\DeviationComplaintProductTypes;
use App\Models\DeviationComplaintDeviationTypes;
use App\Models\DeviationComplaintRiskCategories;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
$translation = '{"en": {"greeting":"Welcome back","sign_in_title":"Sign In to Techfood","username":"Username","password": "Password","signin":"Sign in","username_placeholder":"Enter your username","password_placeholder":"Enter your password","catch_phrase":"Streamline Your Lab:","catch_sentence":"Digitizing Food Results with Precision!","add_new":"Add New","new":"New","language":"Language","dashboard": "Dashboard","my_records":"My Records","protein_lactose_water":"Protein Lactos & Water","protein_lactose_water_chart":"Protein Lactos & Water Charts","fruit_production":"Fruit Production","deviation_complaints":"Deviation Complaints","microbiological_sample":"Microbiological Samples Environment","product":"Product","limit":"Limit","from":"From","to":"To",
"staffing_of_production":"Staffing of production","drill_samples_in_slaughter": "Drill samples in slaughter","ccp_follow_up": "CCP follow up","slaughtered_head_meat_midriff":"Slaughter Head Meat/Midriff","satisfactory":"Satisfactory","actions_required":"Actions are required","daily_hygiene_rounds": "Daily Hygiene Rounds","settings": "Settings","menu": "MENU","home": "Home","date": "Date","month": "Month","section": "Section","cause": "Cause","status": "Status","deviation_type": "Deviation Type","batch_number": "Batch Number","protein_value": "Protein Value","lactose_value": "Lactose Value",
"water_value": "Water Value","actions": "Actions","heading_protein_lactose_water": "Digitization and follow-up of protein and water content analysis results from production","heading_fruit_production":"Digitization of fruit production","heading_deviation_complaints":"Digitization and follow-up of deviations complaints","heading_drill_sample":"Streamlining Data Collection and Analysis for Drill Samples","english":"English","swedish": "Swedish","french": "French","spanish": "Spanish","portuguese":"Portuguese","fruit_production_fruit_key": {"orange":"Orange","apple":"Apple","banana":"Banana","strawberry":"Strawberry","cherries":"Cherries","avocado":"Avocado","watermelon":"Watermelon","grape":"Grape"},"save":"Save","add_row":"Add Row","select":"Select","success_save_response":"Ok! Data saved successfully","success_save_protein_lactose_water":"
Protein, Lactos, water data saved successfully","loading":"Loading","protein":"Protein","lactose":"Lactose","water":"Water","chart_type":"Chart Type","bar":"Bar","area":"Area","stack":"Stack","not":"Not","yes":"Yes","no":"No","week":"Week","slaughter_house":"Slaughter house","slaughter_date":"Slaughter Date","slaughter_number":"Slaughter Number","piece_date":"Piece Date","number_of_days_after_slaughter":"Number of days after slaughter","kind_of_animal":"Kind of animal","aerobic":"Aerobic","e_coli":"E.Coli","enterobacta":"Enterobacter","staphylococcus":"Staphylococcus","all":"All",
"drill_sample_product_key":{
"krav":"KRAV","se":"SE","sag":"SAG"
},"drill_sample_animal_key":{
"beef_118":"Beef 118","beef":"Beef","lam":"Lam","beef_048":"Beef 048","pork":"Pork"
},
"success_delete_response":"Data deleted successfully","update":"Update","values":"Values","delete_question":"Are you sure you want to delete this record","yes_confirm":"Yes I`m sure","no_confirm":"No, Cancel","view_chart":"View Chart","chart":"Chart","my_profile":"My Profile","account_settings":"Account Settings","signout":"Sign Out","no_record_found":"No record found! Please create record","header":"Header","code":"Code","article":"Article","number":"Number","location":"Location","line":"Line","reference_number":"Reference Number","title":"Title","occurance_date":"Occurance Date","deviation_code":"Deviation Code","risk_category":"Risk Category","product_type":"Product Type","deviation_description":"Description of deviation","suggested_correction":"Suggested Correction",
"fruit_production_cause_key": {"tidiness_and_cleaning":"Tidiness and cleaning","maintenance":"Maintenance","order_and_order":"Order and order","pest":"Pest","food_hygiene":"Food hygiene"},
"fruit_production_status_type_key": {"not_started":"Not Started","job_in_progress":"Job in Progress","job_finished":"Job Finished","effect_implemented":"Effect Implemented"},
"fruit_production_deviation_types_key": {"allergens":"Allergens","microbiological":"Microbiological","chemical":"Chemical","physical":"Physical"},
"deviation_complaint_section_key": {"lab": "LAB","the_warehouse":"The Ware House","dry_side": "Dry Side","wet_side": "Wet side","workshop":"Workshop","out": "Out","miscellaneous": "Miscellaneous"},
"deviation_complaint_deviation_types_key":{"fire_protection":"Fire Protection","ecokrav":"Eco/KRav","hygiene_round":"Hygiene Round","customer_audit":"Customer Audit","quality":"Quality","quality_audit_-_external_fssc":"Quality Audit - External FSSC","quality_audit_-_external_iso_9001":"Quality Audit - External ISO 9001","quality_audit_-_internal":"Quality Audit - Internal","environment":"Environment","environmental_audit_-_external_iso_14000":"Environmental Audit - External ISO 14000","environmental_audit_-_internal":"Environmental Audit - Internal","energy_audit_-_external":"Energy Audit - External"},
"deviation_complaint_remark_key":{"big_bag_-_gassing_error":"Big Bag - Gassing error","big_bag-lock_not_on":"Big Bag-Lock not on","big-bag_broken_filters":"Big-Bag Broken filters","big_bag-_other_comment":"Big Bag- Other (Comment)","ccp-_closure":"CCP- Closure","ccp-sight":"CCP-Sight","ccp_metal_detector":"CCP_Metal detector","paper":"Paper","cip_disk":"CIP Disk","routineinstruction_not_followed":"Routine/instruction not followed","packaging-decor_error":"Packaging-Decor error","packaging_-_misdelivery":"Packaging - Misdelivery","packaging-damaged_packaging":"Packaging-Damaged packaging","error_in_instruction":"Error in instruction","error_in_routine":"Error in routine","fault_in_production_equipment":"Fault in production equipment","mismixed":"Mismixed","deficient_cleaning":"Deficient cleaning","lack_of_order_and_order":"Lack of order and order","different_texture":"Different texture","moldyyeasthorrible":"Moldy/Yeast/Horrible","foreign_objects":"Foreign objects","wood":"Wood","plastic":"Plastic","metal":"Metal","rubber":"Rubber","packaging_plastic":"Packaging Plastic","hair":"Hair","difficult_to_prepare":"Difficult to prepare","damaged_use_no_glass_in_product":"No glass in product","damaged_use_glass_in_product":"Glass in product","undamaged_use_glass_in_product":"Glass in product","conical_piece_of_glass_from_the_bottom":"Conical piece of glass from the bottom","glass_piece_not_glass_packaging":"Glass piece, Not glass packaging","raw_material_residue":"Raw material residue","damaged_animals":"Damaged animals","brokendamaged_packaging":"Broken/damaged packaging","wrong_label":"Wrong label","wrongly_packed":"Wrongly packed","no_visible_best_before_date":"No visible best before date","wrong_product_quantity_in_packaging":"Wrong product quantity in packaging","hard-to-open_packaging":"Hard-to-open packaging","contaminated_product":"Contaminated product","different_appearance":"Different appearance","burnt_particles":"Burnt particles"},
"deviation_complaint_product_type_key":{"bmp-buttermilk":"BMP-Buttermilk","bread_mix":"Bread mix","porridge":"Porridge","crispbread":"Crispbread","mme":"MME","scrubbing_fluid":"Scrubbing fluid","spray_grease":"Spray grease","spray_foamed_milk":"Spray foamed milk","waltz_cereals":"Waltz Cereals","whey":"Whey","whey_milk":"Whey milk","wpc":"WPC","gruel":"Gruel","gourd-requirements":"Gourd-Requirements","other":"Other"},
"deviation_complaint_line_type_key":{"the_packaging_warehouse":"The packaging warehouse","the_finished_goods_warehouse":"The finished goods warehouse","the_raw_material_warehouse":"The raw material warehouse","l52":"L52","l53":"L53","l54":"L54","l55":"L55","l56":"L56","l57":"L57","l58":"L58","l59":"L59","l62":"L62","l70":"L70","l71":"L71","l73":"L73","l81_rovema_1":"L81 (Rovema 1)","l83_rovema_3":"L83 (Rovema 3)","l84_hermic":"L84 (Hermic)","l89_rovema_4":"L89 (Rovema 4)","l90_can_line":"L90 Can line","tower_1":"Tower 1","tower_3":"Tower 3","tower_4":"Tower 4","the_ultrafiltration":"The ultrafiltration","waltz_6":"Waltz 6","waltz_78":"Waltz 7/8","tank_hall":"Tank hall"}
},
"sv": {"greeting":"Välkommen tillbaka","sign_in_title": "Logga in på Techfood","username": "Användarnamn","password": "Lösenord","signin": "Logga in","username_placeholder": "Ange ditt användarnamn","password_placeholder": "Ange ditt lösenord","catch_phrase": "Strömlinjeforma ditt laboratorium:","catch_sentence": "Digitalisera livsmedelsresultat med precision!","add_new": "Lägga till ny","product": "Produkt","new":"Ny","language": "Språk","dashboard": "Instrumentbräda","my_records": "mina Rekord","protein_lactose_water": "Protein,laktos och vatten","protein_lactose_water_chart": "Protein laktos och vatten diagram","satisfactory":"Tillfredsställande","actions_required":"Åtgärder krävs","fruit_production": "Livsmedelssäkerhet uppföljning","deviation_complaints": "Avvikelse uppföljning","microbiological_sample": "Analys av mikrobiologiska provresultat","staffing_of_production": "Bemanning av produktion","drill_samples_in_slaughter":"Borrprover i slakt","ccp_follow_up":"CCP uppföljning","slaughtered_head_meat_midriff": "Slakt Skallkött/Mellangärde","limit": "Gränsvärde",
"daily_hygiene_rounds": "Dagliga hygienrundor","settings": "Inställningar","menu": "MENY","home": "Hem","date": "Datum","month": "Månad","section": "Avdelning","cause": "Orsaka","status": "Status","deviation_type": "Typ av avvikelse","batch_number": "Satsnummer","protein_value": "Proteinvärde","lactose_value": "Laktosvärde","water_value": "Vattenvärde","actions": "Handlingar","from":"Från","to":"Till","heading_protein_lactose_water": "Digitalisering och uppföljning av protein- och vatteninnehållsanalysresultat från produktionen","heading_fruit_production": "Digitalisering av livsmedelssäkerhet uppföljning","heading_deviation_complaints": "Digitalisering och uppföljning av Avvikelse uppföljning","english": "Engelska","swedish": "Svenska","french": "Franska","spanish": "Spanska","portuguese": "Portugisiska","fruit_production_fruit_key": {"orange":"Orange","apple":"Äpple","banana":"Banan","strawberry":"Jordgubb","cherries":"Körsbär","avocado":" Avocado","watermelon":"Vattenmelon","grape":"Druva"},"chart_type": "Diagramtyp",
  "bar": "Stapeldiagram",
  "area": "Ytdiagram",
  "stack": "Stapla",
  "not": "Inte",
  "yes": "Ja",
  "no": "Nej",
   "week": "Vecka",
  "slaughter_house": "Slakteri",
  "slaughter_number": "Slaktnummer",
  "slaughter_date": "Slaktdatum",
  "piece_date": "Styckningsdatum",
  "number_of_days_after_slaughter": "Antal dagar efter slakt",
  "kind_of_animal": "Djurslag",
  "aerobic": "Aeroba",
  "e_coli": "E.Coli", "enterobacta": "Enterobact","staphylococcus": "Stafylokocker","all":"Alla",
  "drill_sample_product_key": {
    "krav": "KRAV",
    "se": "SE",
    "sag": "SAG"
  },
  "drill_sample_animal_key": {
    "beef_118": "Nöt 118",
    "beef": "Nöt",
    "lam": "Lamm",
    "beef_048": "Nöt 048",
    "pork": "Fläskkött"
  },
"fruit_production_cause_key": {"tidiness_and_cleaning":"Städning","maintenance":"Underhåll","order_and_order":"Ordning och reda","pest":"Skadedjur","food_hygiene":"Livsmedelshygien"},
"fruit_production_status_type_key": {"not_started":"Inte påbörjad","job_in_progress":"Jobb pågår","job_finished":"Jobb avslutat","effect_implemented":"Effekt implementerad"},"save":"Spara","add_row":"Lägg till rad","select":"Välj","success_save_response":"Ok! Data har sparats",
"success_save_protein_lactose_water": "Protein, laktos, vatten sparades framgångsrikt",
"loading": "Laddar",
"protein": "Protein",
"lactose": "Laktos",
"water": "Vatten",
"success_delete_response":"Data raderades framgångsrikt","update":"Uppdatera",
"values":"Värden","delete_question":"Är du säker på att du vill ta bort denna post","yes_confirm":"Ja, jag är säker","no_confirm":"Nej, Avbryt","view_chart":"Visa diagram","chart":"Diagram","my_profile":"Min profil","account_settings":"Kontoinställningar","signout":"Logga ut","no_record_found":"Ingen post hittades! Vänligen skapa post","header":"Rubrik","code":"Kod","article":"Artikel","number":"Nummer","location":"Plats","line":"Linje","reference_number":"Referensnummer","title":"Titel","occurance_date":"Förekomstdatum","deviation_code":"Avvikelsekod","risk_category":"Riskkategori","product_type":"Produkt Typ","deviation_description":"Beskrivning av avvikelse","suggested_correction":"Föreslagen korrigering",
"fruit_production_deviation_types_key": {"physical": "Fysisk","microbiological": "Mikrobiologiska","allergens": "Allergener","chemical": "Kemisk"},
"deviation_complaint_section_key": {
"lab": "LAB",
"the_warehouse": "Lager",
"dry_side": "Torrsidan",
"wet_side": "Våtsidan",
"workshop": "Verkstad",
"out": "Ut",
"miscellaneous": "Övrigt"
},
"deviation_complaint_deviation_types_key": {
    "fire_protection": "Brandskydd",
    "ecokrav": "Ekologiska krav",
    "hygiene_round": "Hygienrond",
    "customer_audit": "Kundrevision",
    "quality": "Kvalitet",
    "quality_audit_-_external_fssc": "Kvalitetsrevision - Extern FSSC",
    "quality_audit_-_external_iso_9001": "Kvalitetsrevision - Extern ISO 9001",
    "quality_audit_-_internal": "Kvalitetsrevision - Intern",
    "environment": "Miljö",
    "environmental_audit_-_external_iso_14000": "Miljörevision - Extern ISO 14000",
    "environmental_audit_-_internal": "Miljörevision - Intern",
    "energy_audit_-_external": "Energirevision - Extern"
  },
  "deviation_complaint_remark_key":{
    "big_bag_-_gassing_error": "Big Bag - Gasningsfel",
    "big_bag-lock_not_on": "Big Bag - Lås ej aktiverat",
    "big-bag_broken_filters": "Big-Bag - Trasiga filter",
    "big_bag-_other_comment": "Big Bag - Annat (Kommentar)",
    "ccp-_closure": "CCP - Stängning",
    "ccp-sight": "CCP - Sikt",
    "ccp_metal_detector": "CCP - Metalldetektor",
    "paper": "Papper",
    "cip_disk": "CIP-skiva",
    "routineinstruction_not_followed": "Rutininstruktion ej följd",
    "packaging-decor_error": "Förpackning - Dekorationsfel",
    "packaging_-_misdelivery": "Förpackning - Fel leverans",
    "packaging-damaged_packaging": "Förpackning - Skadad förpackning",
    "error_in_instruction": "Fel i instruktion",
    "error_in_routine": "Fel i rutin",
    "fault_in_production_equipment": "Fel i produktionsutrustning",
    "mismixed": "Felblandat",
    "deficient_cleaning": "Bristfällig rengöring",
    "lack_of_order_and_order": "Brist på ordning och reda",
    "different_texture": "Annan textur",
    "moldyyeasthorrible": "Mögel/Jäst/Avskyvärd",
    "foreign_objects": "Främmande föremål",
    "wood": "Träd",
    "plastic": "Plast",
    "metal": "Metall",
    "rubber": "Gummi",
    "packaging_plastic": "Förpackningsplast",
    "hair": "Hår",
    "difficult_to_prepare": "Svårt att förbereda",
    "damaged_use_no_glass_in_product": "Skadad användning, ingen glas i produkten",
    "damaged_use_glass_in_product": "glas i produkten",
    "undamaged_use_glass_in_product": "glas i produkten",
    "conical_piece_of_glass_from_the_bottom": "Konisk glasbit från botten",
    "glass_piece_not_glass_packaging": "Glasbit, inte glasförpackning",
    "raw_material_residue": "Råmaterialrester",
    "damaged_animals": "Skadedjur",
    "brokendamaged_packaging": "Trasig/skadad förpackning",
    "wrong_label": "Fel etikett",
    "wrongly_packed": "Felaktigt packat",
    "no_visible_best_before_date": "Ingen synlig bäst före-datum",
    "wrong_product_quantity_in_packaging": "Fel produktmängd i förpackning",
    "hard-to-open_packaging": "Svårt att öppna förpackning",
    "contaminated_product": "Kontaminerad produkt",
    "different_appearance": "Annorlunda utseende",
    "burnt_particles": "Brända partiklar"
    },
    "deviation_complaint_product_type_key": {
    "bmp-buttermilk": "BMP-Buttermjölk",
    "bread_mix": "Brödmix",
    "porridge": "Gröt",
    "crispbread": "Knäckebröd",
    "mme": "MME",
    "scrubbing_fluid": "Scrubblösning",
    "spray_grease": "Sprayfett",
    "spray_foamed_milk": "Sprayskumad mjölk",
    "waltz_cereals": "Waltz Flingor",
    "whey": "Vassle",
    "whey_milk": "Vasslemjölk",
    "wpc": "WPC",
    "gruel": "Grynsoppa",
    "gourd-requirements": "Kürbiskrav",
    "other": "Annan"
    },
    "deviation_complaint_line_type_key": {
    "the_packaging_warehouse": "Förpackningslagret",
    "the_finished_goods_warehouse": "Färdigvarulagret",
    "the_raw_material_warehouse": "Råvarulagret",
    "l52": "L52",
    "l53": "L53",
    "l54": "L54",
    "l55": "L55",
    "l56": "L56",
    "l57": "L57",
    "l58": "L58",
    "l59": "L59",
    "l62": "L62",
    "l70": "L70",
    "l71": "L71",
    "l73": "L73",
    "l81_rovema_1": "L81 (Rovema 1)",
    "l83_rovema_3": "L83 (Rovema 3)",
    "l84_hermic": "L84 (Hermic)",
    "l89_rovema_4": "L89 (Rovema 4)",
    "l90_can_line": "L90 Konservlinje",
    "tower_1": "Tower 1",
    "tower_3": "Tower 3",
    "tower_4": "Tower 4",
    "the_ultrafiltration": "Ultrafiltreringen",
    "waltz_6": "Vals 6",
    "waltz_78":"Waltz 7/8",
    "tank_hall":"Tank hall"
    }
},"fr":{
  "greeting": "Bienvenue",
  "sign_in_title": "Connectez-vous à Techfood",
  "username": "Nom d`utilisateur",
  "password": "Mot de passe",
  "signin": "Se connecter",
  "username_placeholder": "Entrez votre nom d`utilisateur",
  "password_placeholder": "Entrez votre mot de passe",
  "catch_phrase": "Optimisez votre laboratoire :","product": "Produit",
  "catch_sentence": "Numériser les résultats alimentaires avec précision !",
  "add_new": "Ajouter Nouveau","new": "Nouveau","save": "Enregistrer", "add_row": "Ajouter une ligne", "select": "Sélectionner","success_save_response": "Ok ! Données enregistrées avec succès","success_delete_response":"Données supprimées avec succès","update": "Mettre à jour", "values": "Valeurs", "delete_question": "Êtes-vous sûr de vouloir supprimer cet enregistrement","yes_confirm": "Oui, j`en suis sûr", "no_confirm": "Non, annuler","view_chart": "Afficher le graphique","chart":"Graphique", "my_profile": "Mon profil", "account_settings": "Paramètres du compte","satisfactory": "Satisfaisant", "actions_required": "Des actions sont requises", "signout": "Se déconnecter","no_record_found": "Aucun enregistrement trouvé ! Veuillez créer un enregistrement","header": "En-tête", "code": "Code", "article": "Article", "number": "Numéro", "location": "Emplacement", "line": "Ligne","reference_number": "Numéro de référence", "title": "Titre", "occurance_date": "Date d`occurrence", "deviation_code": "Code d`écart", "risk_category": "Catégorie de risque", "product_type": "Type de produit", "deviation_description": "Description de l`écart", "suggested_correction": "Correction suggérée","limit": "Limite",
  "language": "Langue","from": "De", "to": "À",
  "dashboard": "Tableau de Bord", "chart_type": "Type de graphique",
  "bar": "Barre",
  "area": "Aire",
  "stack": "Empiler",
  "not": "Non",
  "yes": "Oui",
  "no": "Non",
  "my_records": "Mes Enregistrements",
  "protein_lactose_water": "Protéine Lactose & Eau",
  "protein_lactose_water_chart": "Tableaux des protéines, du lactose et de l`eau",
  "fruit_production": "Production de Fruits",
  "deviation_complaints": "Réclamations de Déviation",
  "microbiological_sample": "Échantillons Microbiologiques Environnement",
  "staffing_of_production": "Dotation en Personnel de Production",
  "drill_samples_in_slaughter": "Échantillons de Forage à l`Abattage",
  "ccp_follow_up": "Suivi CCP","slaughtered_head_meat_midriff": "Viande de tête/Diaphragme abattus",
  "daily_hygiene_rounds": "Rondes d`Hygiène Quotidiennes",
  "settings": "Paramètres",
  "menu": "MENU",
  "home": "Accueil",
  "date": "Date",
  "month": "Mois",
  "section": "Section",
  "cause": "Cause",
  "status": "Statut",
  "deviation_type": "Type de Déviation",
  "batch_number": "Numéro de Lot",
  "protein_value": "Valeur de Protéine",
  "lactose_value": "Valeur de Lactose",
  "water_value": "Valeur d`Eau",
  "actions": "Actions",
  "week": "Semaine",
  "slaughter_house": "Abattoir",
  "slaughter_date": "Date d`abattage","slaughter_number": "Numéro d`abattage",
  "piece_date": "Date de découpe",
  "number_of_days_after_slaughter": "Nombre de jours après abattage",
  "kind_of_animal": "Type d`animal",
  "aerobic": "Aérobie",
  "e_coli": "E.Coli","enterobacta": "Entérobact","staphylococcus": "Staphylocoque","all":"Tous",
  "drill_sample_product_key": {
    "krav": "KRAV",
    "se": "SE",
    "sag": "SAG"
  },
  "drill_sample_animal_key": {
    "beef_118": "Bœuf 118",
    "beef": "Bœuf",
    "lam": "Agneau",
    "beef_048": "Bœuf 048",
    "pork": "Porc"
  },
"success_save_protein_lactose_water": "Données de protéine, lactose, eau enregistrées avec succès",
  "loading": "Chargement",
  "protein": "Protéine",
  "lactose": "Lactose",
  "water": "Eau",
  "heading_protein_lactose_water": "Numérisation et suivi des résultats d`analyse de la teneur en protéines et en eau de la production",
  "heading_fruit_production": "Numérisation de la production de fruits",
  "heading_deviation_complaints": "Numérisation et suivi des réclamations d`écarts",
  "english": "Anglais",
  "swedish": "Suédois",
  "french": "Français",
  "spanish": "Espagnol",
  "portuguese": "Portugais",
  "fruit_production_fruit_key": {"orange":"Orange","apple":"Pomme","banana":"Banane","strawberry":"Fraise","cherries":"Cerises","avocado":"Avocat","watermelon":"Pastèque","grape":"Raisin"},
"fruit_production_cause_key": {"tidiness_and_cleaning":"Rangement et nettoyage","maintenance":"Maintenance","order_and_order":"order_and_order","pest":"Parasite","food_hygiene":"Hygiène alimentaire"},
"fruit_production_status_type_key": {"not_started":"Non démarré","job_in_progress":"Travail en cours","job_finished":"Travail terminé","effect_implemented":"Effet implémenté"},
"fruit_production_deviation_types_key": {"allergens": "Allergènes", "microbiological": "Microbiologique", "chemical": "Chimique", "physical": "Physique"},
"deviation_complaint_section_key": {"lab": "LAB", "the_warehouse": "L`entrepôt", "dry_side": "Côté sec", "wet_side": "Côté humide", "workshop": "Atelier", "out": "Dehors", "miscellaneous": "Divers"},
"deviation_complaint_deviation_types_key": {
    "fire_protection": "Protection contre l`incendie",
    "ecokrav": "Exigences écologiques",
    "hygiene_round": "Ronde d`hygiène",
    "customer_audit": "Audit client",
    "quality": "Qualité",
    "quality_audit_-_external_fssc": "Audit qualité - FSSC externe",
    "quality_audit_-_external_iso_9001": "Audit qualité - ISO 9001 externe",
    "quality_audit_-_internal": "Audit qualité - Interne",
    "environment": "Environnement",
    "environmental_audit_-_external_iso_14000": "Audit environnemental - ISO 14000 externe",
    "environmental_audit_-_internal": "Audit environnemental - Interne",
    "energy_audit_-_external": "Audit énergétique - Externe"
  },
  "deviation_complaint_remark_key": {
    "big_bag_-_gassing_error": "Big Bag - Erreur de gazage",
    "big_bag-lock_not_on": "Big Bag - Verrouillage non activé",
    "big-bag_broken_filters": "Big-Bag - Filtres cassés",
    "big_bag-_other_comment": "Big Bag - Autre (Commentaire)",
    "ccp-_closure": "CCP - Fermeture",
    "ccp-sight": "CCP - Vue",
    "ccp_metal_detector": "CCP - Détecteur de métaux","paper":"Papier",
    "cip_disk": "Disque CIP",
    "routineinstruction_not_followed": "Routine/instruction non suivie",
    "packaging-decor_error": "Emballage - Erreur de décoration",
    "packaging_-_misdelivery": "Emballage - Mauvaise livraison",
    "packaging-damaged_packaging": "Emballage - Emballage endommagé",
    "error_in_instruction": "Erreur dans l`instruction",
    "error_in_routine": "Erreur dans la routine",
    "fault_in_production_equipment": "Défaut dans l`équipement de production",
    "mismixed": "Mélangé de manière incorrecte",
    "deficient_cleaning": "Nettoyage insuffisant",
    "lack_of_order_and_order": "Manque d`ordre",
    "different_texture": "Texture différente",
    "moldyyeasthorrible": "Moisi/Levure/Horrible",
    "foreign_objects": "Objets étrangers",
    "wood": "Bois",
    "plastic": "Plastique",
    "metal": "Métal",
    "rubber": "Caoutchouc",
    "packaging_plastic": "Plastique d`emballage",
    "hair": "Cheveu",
    "difficult_to_prepare": "Difficile à préparer",
    "damaged_use_no_glass_in_product": "sans verre dans le produit",
    "damaged_use_glass_in_product": "verre dans le produit",
    "undamaged_use_glass_in_product": "verre dans le produit",
    "conical_piece_of_glass_from_the_bottom": "Pièce conique de verre du bas",
    "glass_piece_not_glass_packaging": "Morceau de verre, pas d`emballage en verre",
    "raw_material_residue": "Résidu de matière première",
    "damaged_animals": "Animaux endommagés",
    "brokendamaged_packaging": "Emballage cassé/endommagé",
    "wrong_label": "Mauvais étiquette",
    "wrongly_packed": "Mauvais emballage",
    "no_visible_best_before_date": "Aucune date de péremption visible",
    "wrong_product_quantity_in_packaging": "Mauvaise quantité de produit dans l`emballage",
    "hard-to-open_packaging": "Emballage difficile à ouvrir",
    "contaminated_product": "Produit contaminé",
    "different_appearance": "Apparence différente",
    "burnt_particles": "Particules brûlées"
    },
    "deviation_complaint_product_type_key": {
    "bmp-buttermilk": "BMP-Buttermilk",
    "bread_mix": "Mélange pour pain",
    "porridge": "Bouillie",
    "crispbread": "Pain croustillant",
    "mme": "MME",
    "scrubbing_fluid": "Liquide de nettoyage",
    "spray_grease": "Graisse en spray",
    "spray_foamed_milk": "Lait moussant en spray",
    "waltz_cereals": "Céréales Waltz",
    "whey": "Petit-lait",
    "whey_milk": "Lait de petit-lait",
    "wpc": "WPC",
    "gruel": "Gruau",
    "gourd-requirements": "Exigences de courge",
    "other": "Autre"
    },
    "deviation_complaint_line_type_key": {
    "the_packaging_warehouse": "Entrepôt d`emballage",
    "the_finished_goods_warehouse": "Entrepôt des produits finis",
    "the_raw_material_warehouse": "Entrepôt des matières premières",
    "l52": "L52",
    "l53": "L53",
    "l54": "L54",
    "l55": "L55",
    "l56": "L56",
    "l57": "L57",
    "l58": "L58",
    "l59": "L59",
    "l62": "L62",
    "l70": "L70",
    "l71": "L71",
    "l73": "L73",
    "l81_rovema_1": "L81 (Rovema 1)",
    "l83_rovema_3": "L83 (Rovema 3)",
    "l84_hermic": "L84 (Hermic)",
    "l89_rovema_4": "L89 (Rovema 4)",
    "l90_can_line": "L90 Ligne de boîtes",
    "tower_1": "Tour 1",
    "tower_3": "Tour 3",
    "tower_4": "Tour 4",
    "the_ultrafiltration": "Ultrafiltration",
    "waltz_6": "Valse 6",
    "waltz_78":"Waltz 7/8",
    "tank_hall":"Tank hall"
    }
  },"pt":{
  "greeting": "Bem-vindo de volta",
  "sign_in_title": "Entrar no Techfood",
  "username": "Nome de usuário",
  "password": "Senha",
  "signin": "Entrar",
  "username_placeholder": "Digite seu nome de usuário",
  "password_placeholder": "Digite sua senha",
  "catch_phrase": "Otimize seu laboratório:","product": "Produto",
  "catch_sentence": "Digitalizando resultados alimentares com precisão!",
  "add_new": "Adicionar Novo","new":"Novo","save":"Salvar","add_row":"Adicionar linha","select":"Selecionar","success_save_response":"Ok! Dados salvos com sucesso","satisfactory":"Satisfatório","actions_required":"Ações são necessárias","limite":"Limite",
   "success_save_protein_lactose_water": "Dados de proteína, lactose e água salvos com sucesso",
  "loading": "Carregando",
  "protein": "Proteína",
  "lactose": "Lactose","chart_type": "Tipo de gráfico",
  "bar": "Barra",
  "area": "Área",
  "stack": "Empilhar",
  "not": "Não",
  "yes": "Sim",
  "no": "Não",
  "water": "Água","from":"De","to":"Para",
  "language": "Idioma","success_delete_response":"Dados excluídos com sucesso","update":"Atualizar","values":"Valores","delete_question":"Tem certeza de que deseja excluir este registro","yes_confirm":"Sim, tenho certeza","no_confirm":"Não, cancelar","view_chart":"Exibir gráfico","chart":"Gráfico","my_profile":"Meu perfil","account_settings":"Configurações da conta","signout":"Sair",
  "dashboard": "Painel de Controlo","no_record_found":"Nenhum registro encontrado! Por favor, crie um registro","header":"Cabeçalho","code":"Código","article":"Artigo","number":"Número","location":"Localização","line":"Linha","reference_number":"Número de referência","title":"Título","occurance_date":"Data da ocorrência","deviation_code":"Código do desvio","risk_category":"Categoria de risco","product_type":"Tipo de produto","deviation_description":"Descrição do desvio","suggested_correction":"Correção sugerida",
  "my_records": "Meus Registros",
  "protein_lactose_water": "Proteína Lactose & Água",
  "protein_lactose_water_chart": "Gráficos de proteína, lactose e água",
  "fruit_production": "Produção de Frutas",
  "deviation_complaints": "Queixas de Desvio",
  "microbiological_sample": "Amostras Microbiológicas do Ambiente",
  "staffing_of_production": "Contratação de Pessoal na Produção",
  "drill_samples_in_slaughter": "Amostras de Perfuração no Abate",
  "ccp_follow_up": "Acompanhamento CCP","slaughtered_head_meat_midriff": "Carne de Cabeça/Meio do Corpo Abatida",
  "daily_hygiene_rounds": "Rondas Diárias de Higiene",
  "settings": "Configurações",
  "menu": "MENU",
  "home": "Início",
  "date": "Data",
  "month": "Mês",
  "section": "Seção",
  "cause": "Causa",
  "status": "Status",
  "deviation_type": "Tipo de Desvio",
  "batch_number": "Número do Lote",
  "protein_value": "Valor de Proteína",
  "lactose_value": "Valor de Lactose",
  "water_value": "Valor de Água",
  "actions": "Ações",
  "week": "Semana",
  "slaughter_house": "Abatedouro",
  "slaughter_date": "Data de abate","slaughter_number": "Número de abate",
  "piece_date": "Data de corte",
  "number_of_days_after_slaughter": "Número de dias após o abate",
  "kind_of_animal": "Tipo de animal",
  "aerobic": "Aeróbico",
  "e_coli": "E.Coli","enterobacta": "Enterobact","staphylococcus": "Estafilococo","all":"Todos",
  "drill_sample_product_key": {
    "krav": "KRAV",
    "se": "SE",
    "sag": "SAG"
  },
  "drill_sample_animal_key": {
    "beef_118": "Carne Bovina 118",
    "beef": "Carne Bovina",
    "lam": "Carne de Cordeiro",
    "beef_048": "Carne Bovina 048",
    "pork": "Carne de Porco"
  },
  "heading_protein_lactose_water": "Digitalização e acompanhamento dos resultados de análise de conteúdo de proteínas e água da produção",
  "heading_fruit_production": "Digitalização da produção de frutas",
  "heading_deviation_complaints": "Digitalização e acompanhamento de reclamações de desvios",
  "english": "Inglês",
  "swedish": "Sueco",
  "french": "Francês",
  "spanish": "Espanhol",
  "portuguese": "Português",
  "fruit_production_fruit_key": {"orange":"Laranja","apple":"Maçã","banana":"Banana","strawberry":"Morango","cherries":"Cerejas","avocado":"Abacate","watermelon":"Melancia","grape":"Uva"},
"fruit_production_cause_key": {"tidiness_and_cleaning":"Arrumação e limpeza","maintenance":"Manutenção","order_and_order":"Ordem e ordem","pest":"Praga","food_hygiene":"Higiene alimentar"},
"fruit_production_status_type_key": {"not_started":"Não iniciado","job_in_progress":"Trabalho em andamento","job_finished":"Trabalho Concluído","effect_implemented":"Efeito implementado"},
"fruit_production_deviation_types_key": {"allergens":"Alérgenos","microbiological":"Microbiológico","chemical":"Químico","physical":"Físico"},
"deviation_complaint_section_key": {"lab": "LAB","the_warehouse":"O armazém","dry_side": "Lado seco","wet_side": "Lado molhado","workshop":"Oficina","out": "Fora","miscellaneous": "Diversos"},
"deviation_complaint_deviation_types_key": {
    "fire_protection": "Proteção contra incêndio",
    "ecokrav": "Exigências ecológicas",
    "hygiene_round": "Ronda de higiene",
    "customer_audit": "Auditoria do cliente",
    "quality": "Qualidade",
    "quality_audit_-_external_fssc": "Auditoria de qualidade - FSSC externo",
    "quality_audit_-_external_iso_9001": "Auditoria de qualidade - ISO 9001 externo",
    "quality_audit_-_internal": "Auditoria de qualidade - Interna",
    "environment": "Meio ambiente",
    "environmental_audit_-_external_iso_14000": "Auditoria ambiental - ISO 14000 externo",
    "environmental_audit_-_internal": "Auditoria ambiental - Interna",
    "energy_audit_-_external": "Auditoria energética - Externa"
  },
"deviation_complaint_remark_key": {
    "big_bag_-_gassing_error": "Big Bag - Erro de gaseificação",
    "big_bag-lock_not_on": "Big Bag - Bloqueio não ativado",
    "big-bag_broken_filters": "Big-Bag - Filtros quebrados",
    "big_bag-_other_comment": "Big Bag - Outro (Comentário)",
    "ccp-_closure": "CCP - Fechamento",
    "ccp-sight": "CCP - Visão",
    "ccp_metal_detector": "CCP - Detector de metais","paper":"Papel",
    "cip_disk": "Disco CIP",
    "routineinstruction_not_followed": "Rotina/instrução não seguida",
    "packaging-decor_error": "Embalagem - Erro de decoração",
    "packaging_-_misdelivery": "Embalagem - Entrega incorreta",
    "packaging-damaged_packaging": "Embalagem - Embalagem danificada",
    "error_in_instruction": "Erro na instrução",
    "error_in_routine": "Erro na rotina",
    "fault_in_production_equipment": "Falha no equipamento de produção",
    "mismixed": "Mistura incorreta",
    "deficient_cleaning": "Limpeza deficiente",
    "lack_of_order_and_order": "Falta de ordem",
    "different_texture": "Textura diferente",
    "moldyyeasthorrible": "Bolor/Levedura/Horrível",
    "foreign_objects": "Objetos estranhos",
    "wood": "Madeira",
    "plastic": "Plástico",
    "metal": "Metal",
    "rubber": "Borracha",
    "packaging_plastic": "Plástico de embalagem",
    "hair": "Cabelo",
    "difficult_to_prepare": "Difícil de preparar",
    "damaged_use_no_glass_in_product": "sem vidro no produto",
    "damaged_use_glass_in_product": "vidro no produto",
    "undamaged_use_glass_in_product": "vidro no produto",
    "conical_piece_of_glass_from_the_bottom": "Peça cônica de vidro do fundo",
    "glass_piece_not_glass_packaging": "Peça de vidro, não embalagem de vidro",
    "raw_material_residue": "Resíduo de matéria-prima",
    "damaged_animals": "Animais danificados",
    "brokendamaged_packaging": "Embalagem quebrada/danificada",
    "wrong_label": "Etiqueta errada",
    "wrongly_packed": "Embalagem errada",
    "no_visible_best_before_date": "Sem data de validade visível",
    "wrong_product_quantity_in_packaging": "Quantidade de produto errada na embalagem",
    "hard-to-open_packaging": "Embalagem difícil de abrir",
    "contaminated_product": "Produto contaminado",
    "different_appearance": "Aparência diferente",
    "burnt_particles": "Partículas queimadas"
    },
    "deviation_complaint_product_type_key": {
    "bmp-buttermilk": "BMP-Buttermilk",
    "bread_mix": "Mistura para pão",
    "porridge": "Papa",
    "crispbread": "Pão crocante",
    "mme": "MME",
    "scrubbing_fluid": "Fluido de limpeza",
    "spray_grease": "Graxa em spray",
    "spray_foamed_milk": "Leite espumado em spray",
    "waltz_cereals": "Cereais Waltz",
    "whey": "Soro de leite",
    "whey_milk": "Leite de soro",
    "wpc": "WPC",
    "gruel": "Sopa de mingau",
    "gourd-requirements": "Exigências de abóbora",
    "other": "Outro"
    },
    "deviation_complaint_line_type_key": {
    "the_packaging_warehouse": "Armazém de embalagem",
    "the_finished_goods_warehouse": "Armazém de produtos acabados",
    "the_raw_material_warehouse": "Armazém de matérias-primas",
    "l52": "L52",
    "l53": "L53",
    "l54": "L54",
    "l55": "L55",
    "l56": "L56",
    "l57": "L57",
    "l58": "L58",
    "l59": "L59",
    "l62": "L62",
    "l70": "L70",
    "l71": "L71",
    "l73": "L73",
    "l81_rovema_1": "L81 (Rovema 1)",
    "l83_rovema_3": "L83 (Rovema 3)",
    "l84_hermic": "L84 (Hermic)",
    "l89_rovema_4": "L89 (Rovema 4)",
    "l90_can_line": "L90 Linha de latas",
    "tower_1": "Torre 1",
    "tower_3": "Torre 3",
    "tower_4": "Torre 4",
    "the_ultrafiltration": "Ultrafiltração",
    "waltz_6": "Valsa 6",
    "waltz_78":"Waltz 7/8",
    "tank_hall":"Tank hall"
    }
  },"sp":{
  "greeting": "Bienvenido",
  "sign_in_title": "Iniciar sesión en Techfood",
  "username": "Nombre de usuario",
  "password": "Contraseña",
  "signin": "Iniciar sesión",
  "username_placeholder": "Introduce tu nombre de usuario",
  "password_placeholder": "Introduce tu contraseña",
  "catch_phrase": "Optimiza tu laboratorio:","product": "Producto",
  "catch_sentence": "¡Digitalizando los resultados alimentarios con precisión!",
  "add_new": "Agregar Nuevo","new": "Nuevo","save": "Guardar", "add_row": "Agregar fila", "select": "Seleccionar","success_save_response": "Ok, los datos se guardaron correctamente","satisfactory": "Satisfactorio", "actions_required": "Se requieren acciones","limit": "Límite",
"success_save_protein_lactose_water": "Datos de proteína, lactosa y agua guardados exitosamente",
  "loading": "Cargando","from": "Desde", "to": "Hasta",
  "protein": "Proteína",
  "lactose": "Lactosa",
  "water": "Agua",
  "week": "Semana",
  "slaughter_house": "Matadero",
  "slaughter_date": "Fecha de sacrificio","slaughter_number": "Número de sacrificio",
  "piece_date": "Fecha de corte",
  "number_of_days_after_slaughter": "Número de días después del sacrificio",
  "kind_of_animal": "Tipo de animal",
  "aerobic": "Aeróbico",
  "e_coli": "E.Coli","enterobacta": "Enterobact","staphylococcus": "Estafilococo","all":"Todo",
  "drill_sample_product_key": {
    "krav": "KRAV",
    "se": "SE",
    "sag": "SAG"
  },
  "drill_sample_animal_key": {
    "beef_118": "Carne de Res 118",
    "beef": "Carne de Res",
    "lam": "Cordero",
    "beef_048": "Carne de Res 048",
    "pork": "Carne de Cerdo"
  },
  "success_delete_response":"Datos eliminados exitosamente","update": "Actualizar", "values": "Valores", "delete_question": "Está seguro de que desea eliminar este registro","yes_confirm": "Sí", "no_confirm": "No, cancelar","view_chart": "Ver gráfico","chart":"Gráfico", "my_profile": "Mi perfil", "account_settings": "Configuración de la cuenta", "signout": "Cerrar sesión","no_record_found": "No se encontró ningún registro. Por favor, cree un registro","header": "Encabezado", "code": "Código", "article": "Artículo", "number": "Número", "location": "Ubicación", "line": "Línea","reference_number": "Número de referencia", "title": "Título", "occurance_date": "Fecha de ocurrencia", "deviation_code": "Código de desviación", "risk_category": "Categoría de riesgo", "product_type": "Tipo de producto", "deviation_description": "Descripción de la desviación", "suggested_correction": "Corrección sugerida",
  "language": "Idioma",
  "dashboard": "Panel de Controlo",
  "my_records": "Mis Registros", "chart_type": "Tipo de gráfico",
  "bar": "Barra",
  "area": "Área",
  "stack": "Apilar",
  "not": "No",
  "yes": "Sí",
  "no": "No",
  "protein_lactose_water": "Proteína Lactosa & Agua",
  "protein_lactose_water_chart": "Tablas de proteínas, lactosa y agua",
  "fruit_production": "Producción de Frutas",
  "deviation_complaints": "Quejas de Desviación",
  "microbiological_sample": "Muestras Microbiológicas del Entorno",
  "staffing_of_production": "Dotación de Personal en Producción",
  "drill_samples_in_slaughter": "Muestras de Perforación en Sacrificio",
  "ccp_follow_up": "Seguimiento CCP", "slaughtered_head_meat_midriff": "Carne de Cabeza/Diafragma Sacrificada",
  "daily_hygiene_rounds": "Rondas Diarias de Higiene",
  "settings": "Configuraciones",
  "menu": "MENÚ",
  "home": "Inicio",
  "date": "Fecha",
  "month": "Mes",
  "section": "Sección",
  "cause": "Causa",
  "status": "Estado",
  "deviation_type": "Tipo de Desviación",
  "batch_number": "Número de Lote",
  "protein_value": "Valor de Proteína",
  "lactose_value": "Valor de Lactosa",
  "water_value": "Valor de Agua",
  "actions": "Acciones",
  "heading_protein_lactose_water": "Digitalización y seguimiento de los resultados de análisis de contenido de proteínas y agua de la producción",
  "heading_fruit_production": "Digitalización de la producción de frutas",
  "heading_deviation_complaints": "Digitalización y seguimiento de reclamaciones por desviaciones",
  "english": "Inglés",
  "swedish": "Sueco",
  "french": "Francés",
  "spanish": "Español",
  "portuguese": "Portugués",
  "fruit_production_fruit_key": {"orange": "Naranja", "apple": "Manzana", "banana": "Plátano", "strawberry": "Fresa", "cherries": "Cerezas", "avocado": "Aguacate", "watermelon": "Sandía", "grape": "Uva"},
"fruit_production_cause_key": {"tidiness_and_cleaning": "Orden y limpieza", "maintenance": "Mantenimiento", "order_and_order": "Orden y orden", "pest": "Plaga", "food_hygiene": "Higiene de los alimentos"},
"fruit_production_status_type_key": {"not_started": "No iniciado", "job_in_progress": "Trabajo en curso", "job_finished": "Trabajo terminado", "effect_implemented": "Efecto implementado"},
"fruit_production_deviation_types_key": {"allergens": "Alérgenos", "microbiological": "Microbiológico", "chemical": "Químico", "physical": "Físico"},
"deviation_complaint_section_key": {"lab": "LAB", "the_warehouse": "El almacén", "dry_side": "Lado seco", "wet_side": "Lado húmedo", "workshop": "Taller", "out": "Fuera", "miscellaneous": "Misceláneo"},"deviation_complaint_deviation_types_key": {
    "fire_protection": "Protección contra incendios",
    "ecokrav": "Requisitos ecológicos",
    "hygiene_round": "Ronda de higiene",
    "customer_audit": "Auditoría del cliente",
    "quality": "Calidad",
    "quality_audit_-_external_fssc": "Auditoría de calidad - FSSC externo",
    "quality_audit_-_external_iso_9001": "Auditoría de calidad - ISO 9001 externo",
    "quality_audit_-_internal": "Auditoría de calidad - Interna",
    "environment": "Medio ambiente",
    "environmental_audit_-_external_iso_14000": "Auditoría ambiental - ISO 14000 externo",
    "environmental_audit_-_internal": "Auditoría ambiental - Interna",
    "energy_audit_-_external": "Auditoría energética - Externa"
  },
  "deviation_complaint_remark_key": {
    "big_bag_-_gassing_error": "Big Bag - Error de gaseado",
    "big_bag-lock_not_on": "Big Bag - Bloqueo no activado",
    "big-bag_broken_filters": "Big-Bag - Filtros rotos",
    "big_bag-_other_comment": "Big Bag - Otro (Comentario)",
    "ccp-_closure": "CCP - Cierre",
    "ccp-sight": "CCP - Vista",
    "ccp_metal_detector": "CCP - Detector de metales","paper":"Papel",
    "cip_disk": "Disco CIP",
    "routineinstruction_not_followed": "Rutina/instrucción no seguida",
    "packaging-decor_error": "Embalaje - Error de decoración",
    "packaging_-_misdelivery": "Embalaje - Entrega incorrecta",
    "packaging-damaged_packaging": "Embalaje - Embalaje dañado",
    "error_in_instruction": "Error en la instrucción",
    "error_in_routine": "Error en la rutina",
    "fault_in_production_equipment": "Fallo en el equipo de producción",
    "mismixed": "Mal mezclado",
    "deficient_cleaning": "Limpieza deficiente",
    "lack_of_order_and_order": "Falta de orden",
    "different_texture": "Textura diferente",
    "moldyyeasthorrible": "Moho/Levadura/Horrible",
    "foreign_objects": "Objetos extraños",
    "wood": "Madera",
    "plastic": "Plástico",
    "metal": "Metal",
    "rubber": "Goma",
    "packaging_plastic": "Plástico de embalaje",
    "hair": "Cabello",
    "difficult_to_prepare": "Difícil de preparar",
    "damaged_use_no_glass_in_product": "sin vidrio en el producto",
    "damaged_use_glass_in_product": "vidrio en el producto",
    "undamaged_use_glass_in_product": "vidrio en el producto",
    "conical_piece_of_glass_from_the_bottom": "Pieza cónica de vidrio desde el fondo",
    "glass_piece_not_glass_packaging": "Pieza de vidrio, no embalaje de vidrio",
    "raw_material_residue": "Residuo de materia prima",
    "damaged_animals": "Animales dañados",
    "brokendamaged_packaging": "Embalaje roto/dañado",
    "wrong_label": "Etiqueta incorrecta",
    "wrongly_packed": "Empaque incorrecto",
    "no_visible_best_before_date": "No hay fecha de vencimiento visible",
    "wrong_product_quantity_in_packaging": "Cantidad de producto incorrecta en el empaque",
    "hard-to-open_packaging": "Embalaje difícil de abrir",
    "contaminated_product": "Producto contaminado",
    "different_appearance": "Apariencia diferente",
    "burnt_particles": "Partículas quemadas"
    },
    "deviation_complaint_product_type_key": {
    "bmp-buttermilk": "BMP-Buttermilk",
    "bread_mix": "Mezcla para pan",
    "porridge": "Gachas",
    "crispbread": "Pan crujiente",
    "mme": "MME",
    "scrubbing_fluid": "Líquido de limpieza",
    "spray_grease": "Grasa en spray",
    "spray_foamed_milk": "Leche espumada en spray",
    "waltz_cereals": "Cereales Waltz",
    "whey": "Suero de leche",
    "whey_milk": "Leche de suero",
    "wpc": "WPC",
    "gruel": "Sopa de avena",
    "gourd-requirements": "Requisitos de calabaza",
    "other": "Otro"
    },
    "deviation_complaint_line_type_key": {
    "the_packaging_warehouse": "Almacén de embalaje",
    "the_finished_goods_warehouse": "Almacén de productos terminados",
    "the_raw_material_warehouse": "Almacén de materias primas",
    "l52": "L52",
    "l53": "L53",
    "l54": "L54",
    "l55": "L55",
    "l56": "L56",
    "l57": "L57",
    "l58": "L58",
    "l59": "L59",
    "l62": "L62",
    "l70": "L70",
    "l71": "L71",
    "l73": "L73",
    "l81_rovema_1": "L81 (Rovema 1)",
    "l83_rovema_3": "L83 (Rovema 3)",
    "l84_hermic": "L84 (Hermic)",
    "l89_rovema_4": "L89 (Rovema 4)",
    "l90_can_line": "L90 Línea de latas",
    "tower_1": "Torre 1",
    "tower_3": "Torre 3",
    "tower_4": "Torre 4",
    "the_ultrafiltration": "Ultrafiltración",
    "waltz_6": "Vals 6",
    "waltz_78":"Waltz 7/8",
    "tank_hall":"Tank hall"
    }
  }}';


  $section_type = [
    "LAB",
    "The warehouse",
    "Dry Side",
    "Wet side",
    "Workshop",
    "Out",
    "Miscellaneous"
];

$fruitArray = [
    "Orange",
    "Banana",
    "Apple",
    "Strawberry",
    "Cherries",
    "Avocado",
    "Watermelon",
    "Grape",
  ];

$cause_options = [
    "Tidiness and cleaning",
    "Maintenance",
    "Order and order",
    "Pest",
    "Food hygiene"
  ];

$food_production_deviation_types_options = [
    "Physical",
    "Microbiological",
    "Allergens",
    "Chemical"
  ];

$types_of_deviations = [
    "Fire Protection",
    "Eco/KRAV",
    "Hygiene Round",
    "Customer Audit",
    "Quality",
    "Quality Audit - External FSSC",
    "Quality Audit - External ISO 9001",
    "Quality Audit - Internal",
    "Environment",
    "Environmental Audit - External ISO 14000",
    "Environmental Audit - Internal",
    "Energy Audit - External"
  ];

    $risk_type = [
    "A 1",
    "A 2",
    "A 3",
    "A 4",
    "B 1",
    "B 2",
    "B 3",
    "B 4",
    "C 1",
    "C 2",
    "C 3",
    "C 4",
    "D 1",
    "D 2",
    "D 3",
    "D 4"
  ];

$remark_types = [
    "Big Bag - Gassing error",
    "Big Bag-Lock not on",
    "Big-Bag Broken filters",
    "Big Bag- Other (Comment)",
    "CCP- Closure",
    "CCP-Sight",
    "CCP_Metal detector",
    "CCP Metal detector",
    "CIP Disk",
    "Routine/instruction not followed",
    "Packaging-Decor error",
    "Packaging - Misdelivery",
    "Packaging-Damaged packaging",
    "Error in instruction",
    "Error in routine",
    "Fault in production equipment",
    "Mismixed",
    "Deficient cleaning",
    "Lack of order and order",
    "Different texture",
    "Moldy/Yeast/Horrible",
    "Foreign objects",
    "Wood",
    "Plastic",
    "Metal",
    "Paper",
    "Rubber",
    "Packaging plastic",
    "Hair",
    "Difficult to prepare",
    "Damaged use, no glass in product",
    "Damaged use, glass in product",
    "Undamaged use, glass in product",
    "Conical piece of glass from the bottom",
    "Glass piece, Not glass packaging",
    "Raw material residue",
    "Damaged animals",
    "Broken/damaged packaging",
    "Wrong label",
    "Wrongly packed",
    "No visible best before date",
    "Wrong product quantity in packaging",
    "Hard-to-open packaging",
    "Contaminated product",
    "Different appearance",
    "Burnt particles"
];

$product_types = [
    "BMP-Buttermilk",
    "Bread mix",
    "Porridge",
    "Crispbread",
    "MME",
    "Scrubbing fluid",
    "Spray grease",
    "Spray foamed milk",
    "Waltz Cereals",
    "Whey",
    "Whey milk",
    "WPC",
    "Gruel",
    "Gourd-Requirements",
    "Other"
  ];

  $drill_samples_animals = [
    "Pork",
    "Lam",
    "Beef",
    "Beef 118",
    "Beef 048",
  ];

  $drill_samples_products = [
    "KRAV",
    "SAG",
    "SE",
  ];

  $line_types = [
    "The packaging warehouse",
    "The finished goods warehouse",
    "The raw material warehouse",
    "L52",
    "L53",
    "L54",
    "L55",
    "L56",
    "L57",
    "L58",
    "L59",
    "L62",
    "L70",
    "L71",
    "L73",
    "L81 (Rovema 1)",
    "L83 (Rovema 3)",
    "L84 (Hermic)",
    "L89 (Rovema 4)",
    "L90 Can line",
    "Tower 1",
    "Tower 3",
    "Tower 4",
    "The ultrafiltration",
    "Waltz 6",
    "Waltz 7/8",
    "Tank hall",
  ];

  $statusTypes = [
    "Not Started",
    "Job In Progress",
    "Job Finished",
    "Effect Implemented",
  ];

        // foreach ($drill_samples_animals as $animal) {
        //     $name_value = "drill_sample_animal_key.".str_replace(" ","_",strtolower($animal));
        //     $name_key = preg_replace("/[!$%@#^&*()+=\[\]{};:'\",<>?\\|`~\/]/", "", $name_value);
        //     DrillSampleAnimals::create([
        //         'name' => $animal,
        //         'name_key'=>$name_key,
        //         'status'=>'1',
        //     ]);
        // }

        // foreach ($drill_samples_products as $product) {
        //     $name_value = "drill_sample_product_key.".str_replace(" ","_",strtolower($product));
        //     $name_key = preg_replace("/[!$%@#^&*()+=\[\]{};:'\",<>?\\|`~\/]/", "", $name_value);
        //     DrillSampleProducts::create([
        //         'name' => $product,
        //         'name_key'=>$name_key,
        //         'status'=>'1',
        //     ]);
        // }
        
        // foreach ($section_type as $sectionName) {
        //     $name_value = "deviation_complaint_section_key.".str_replace(" ","_",strtolower($sectionName));
        //     $name_key = preg_replace("/[!$%@#^&*()+=\[\]{};:'\",<>?\\|`~\/]/", "", $name_value);
        //     DeviationComplaintSections::create([
        //         'name' => $sectionName,
        //         'name_key'=>$name_key,
        //         'status'=>'1',
        //     ]);
        // }

        // foreach ($fruitArray as $fruit_array) {
        //     $name_value = "fruit_production_fruit_key.".str_replace(" ","_",strtolower($fruit_array));
        //     $name_key = preg_replace("/[!$%@#^&*()+=\[\]{};:'\",<>?\\|`~\/]/", "", $name_value);
        //     Fruits::create([
        //         'name' => $fruit_array,
        //         'name_key'=>$name_key,
        //         'status'=>'1',
        //     ]);
        // }
        // foreach ($cause_options as $option) {
        //     $name_value = "fruit_production_cause_key.".str_replace(" ","_",strtolower($option));
        //     $name_key = preg_replace("/[!$%@#^&*()+=\[\]{};:'\",<>?\\|`~\/]/", "", $name_value);
        //     FruitProductionCauses::create([
        //         'name' => $option,
        //         'name_key'=>$name_key,
        //         'status'=>'1',
        //     ]);
        // }

        // foreach ($food_production_deviation_types_options as $option) {
        //     $name_value = "fruit_production_deviation_types_key.".str_replace(" ","_",strtolower($option));
        //     $name_key = preg_replace("/[!$%@#^&*()+=\[\]{};:'\",<>?\\|`~\/]/", "", $name_value);
        //     FruitProductionDeviationTypes::create([
        //        'name' => $option,
        //         'name_key'=>$name_key,
        //         'status'=>'1',
        //     ]);
        // }

        // foreach ($types_of_deviations as $option) {
        //     $name_value = "deviation_complaint_deviation_types_key.".str_replace(" ","_",strtolower($option));
        //     $name_key = preg_replace("/[!$%@#^&*()+=\[\]{};:'\",<>?\\|`~\/]/", "", $name_value);
        //     DeviationComplaintDeviationTypes::create([
        //         'name' => $option,
        //         'name_key'=>$name_key,
        //         'status'=>'1',
        //     ]);
        // }

        // foreach ($risk_type as $risk) {
        //     $name_value = "deviation_complaint_risk_category_key.".str_replace(" ","_",strtolower($risk));
        //     $name_key = preg_replace("/[!$%@#^&*()+=\[\]{};:'\",<>?\\|`~\/]/", "", $name_value);
        //     DeviationComplaintRiskCategories::create([
        //         'name' => $risk,
        //         'name_key'=>$name_key,
        //         'status'=>'1',
        //     ]);
        // }

        // foreach ($remark_types as $remark) {
        //     $name_value = "deviation_complaint_remark_key.".str_replace(" ","_",strtolower($remark));
        //     $name_key = preg_replace("/[!$%@#^&*()+=\[\]{};:'\",<>?\\|`~\/]/", "", $name_value);
        //     DeviationComplaintRemarkTypes::create([
        //         'name' => $remark,
        //         'name_key'=>$name_key,
        //         'status'=>'1',
        //     ]);
        // }

        // foreach ($product_types as $product) {
        //     $name_value = "deviation_complaint_product_type_key.".str_replace(" ","_",strtolower($product));
        //     $name_key = preg_replace("/[!$%@#^&*()+=\[\]{};:'\",<>?\\|`~\/]/", "", $name_value);
        //     DeviationComplaintProductTypes::create([
        //         'name' => $product,
        //         'name_key'=>$name_key,
        //         'status'=>'1',
        //     ]);
        // }

        // foreach ($line_types as $line) {
        //     $name_value = "deviation_complaint_line_type_key.".str_replace(" ","_",strtolower($line));
        //     $name_key = preg_replace("/[!$%@#^&*()+=\[\]{};:'\",<>?\\|`~\/]/", "", $name_value);
        //     DeviationComplaintLineTypes::create([
        //         'name' => $line,
        //         'name_key'=>$name_key,
        //         'status'=>'1',
        //     ]);
        // }

        

        // foreach ($statusTypes as $status) {
        //     $name_value = "fruit_production_status_type_key.".str_replace(" ","_",strtolower($status));
        //     $name_key = preg_replace("/[!$%@#^&*()+=\[\]{};:'\",<>?\\|`~]/", "", $name_value);
        //     FruitProductionStatusTypes::create([
        //         'name' => $status,
        //         'name_key'=>$name_key,
        //         'status'=>'1',
        //     ]);
        // }

        
            // Translations::create([
            //     'translation' => str_replace("’","'",$translation),
            //     'status'=>'1',
            // ]);
        
        //User::factory(5)->create();
        //LabInputs::factory(100)->create();
        // FruitProduction::factory(100)->create();
        DeviationComplaint::factory(100)->create();
        //DrillSample::factory(100)->create();
        //SlaughterHeadMeatMidriff::factory(150)->create();
        
    }
}
