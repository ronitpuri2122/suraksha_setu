const disasterData = {
    earthquake: {
        title: "Earthquake Preparedness",
        icon: "activity",
        color: "yellow-600",
        description: "Sudden shaking of the ground caused by the passage of seismic waves through Earth's rocks.",
        video: {
            src: "videos/earthquake-drill.mp4",
            title: "Classroom Safety Demonstration"
        },
        steps: [
            {
                title: "Before an Earthquake",
                points: [
                    "Identify safe spots in each room like under a sturdy table.",
                    "Secure heavy furniture to walls to prevent them from falling.",
                    "Prepare an emergency kit with water, first aid, and essential documents.",
                    "Practice 'Drop, Cover, and Hold On' with family and colleagues."
                ]
            },
            {
                title: "During an Earthquake",
                points: [
                    "<strong>Indoors:</strong> Drop to the ground, take cover under a sturdy desk or table, and hold on until the shaking stops.",
                    "<strong>Outdoors:</strong> Move to an open area away from buildings, trees, and power lines.",
                    "<strong>In a vehicle:</strong> Stop in a clear area and stay in the vehicle until the shaking stops."
                ]
            },
            {
                title: "After an Earthquake",
                points: [
                    "Check for injuries and provide first aid.",
                    "Be prepared for aftershocks.",
                    "Check for gas leaks, and if you smell gas, open windows and leave immediately.",
                    "Listen to the radio or TV for emergency information."
                ]
            }
        ]
    },
    flood: {
        title: "Flood Safety",
        icon: "waves",
        color: "blue-600",
        description: "An overflowing of a large amount of water beyond its normal confines, especially over what is normally dry land. Floods can develop slowly or quickly, and flash floods can come with no warning.",
        visuals: [
            { src: "images/stay-informed.png", caption: "Stay informed on local news and emergency broadcasts." },
            { src: "images/emergency-bag.png", caption: "Prepare an emergency bag with essentials." },
            { src: "images/evacuation-route.png", caption: "Know your evacuation routes to safety." },
            { src: "images/leave-early.png", caption: "Leave before flooding starts if an evacuation is advised." },
            { src: "images/higher-ground.png", caption: "Get to a higher ground immediately." },
            { src: "images/avoid-water.png", caption: "Never walk, swim, or drive through floodwater." },
            { src: "images/no-powerlines.png", caption: "Stay clear of fallen power lines." },
            { src: "images/disconnect-utilities.png", caption: "Disconnect electricity and gas if authorities advise." },
        ],
        steps: [
            {
                title: "Before a Flood (Preparedness)",
                points: [
                    "Stay informed by monitoring local news and weather reports for flood warnings.",
                    "Understand the different types of flood alerts such as 'Flood Watch' (be prepared) and 'Flood Warning' (take action).",
                    "Know your area's flood risk, evacuation routes, and the location of official shelters.",
                    "Prepare an 'Emergency Go Bag' with non-perishable food, water, medications, documents, a flashlight, and pet supplies.",
                    "Participate in school and community flood drills. Practicing helps build muscle memory so you can act quickly in a real emergency.",
                    "If possible, move essential items and furniture to a higher floor.",
                    "If advised by authorities, disconnect electricity and gas supplies to prevent fire and electrocution.",
                    "Create a family communication plan so you know how to contact each other if separated."
                ]
            },
            {
                title: "During a Flood (Immediate Action)",
                points: [
                    "Evacuate immediately if instructed to do so. Follow designated routes and leave before flooding starts.",
                    "Move to a higher, safer ground without delay.",
                    "Do not walk, swim, or drive through floodwaters. 'Turn Around, Don't Drown!' Just a few inches of water can be dangerous.",
                    "Avoid contact with floodwater. It can be contaminated with sewage and chemicals, and may hide dangerous debris or downed power lines.",
                    "If trapped in a building, get to the highest level. Do not climb into a closed attic where you may become trapped by rising water."
                ]
            },
            {
                title: "After a Flood (Recovery)",
                points: [
                    "Return home only when authorities declare it is safe.",
                    "Be extremely cautious of fallen power lines and report them immediately.",
                    "Avoid standing water, which could be electrically charged from underground or downed power lines.",
                    "Wear protective gear like sturdy boots and gloves during cleanup.",
                    "Document all damage with photographs for insurance purposes before you start cleaning."
                ]
            }
        ]
    },
    tsunami: {
        title: "Tsunami Safety",
        icon: "ship-wheel",
        color: "cyan-600",
        description: "A series of waves in a water body caused by the displacement of a large volume of water, generally in an ocean or a large lake.",
        steps: [
            {
                title: "Before a Tsunami",
                points: [
                    "If you live in a coastal area, know the local evacuation routes.",
                    "Understand the natural warning signs: strong earthquake, a loud roar from the ocean, or unusual sea level changes.",
                    "Prepare an emergency kit."
                ]
            },
            {
                title: "During a Tsunami Warning",
                points: [
                    "Move inland to higher ground as as possible.",
                    "Follow instructions from local authorities.",
                    "Stay away from the coast until officials declare it safe."
                ]
            },
            {
                title: "After a Tsunami",
                points: [
                    "Continue listening to emergency information.",
                    "Stay out of damaged buildings.",
                    "Be aware of the dangers of contaminated water and debris."
                ]
            }
        ]
    },
    landslide: {
        title: "Landslide Safety",
        icon: "mountain-snow",
        color: "gray-600",
        description: "The movement of rock, debris, or earth down a sloped section of land.",
        steps: [
             {
                title: "Before a Landslide",
                points: [
                    "Learn about the landslide risk in your area.",
                    "Watch for warning signs: cracks in the ground, tilting trees, or unusual sounds.",
                    "Have an evacuation plan."
                ]
            },
            {
                title: "During a Landslide",
                points: [
                    "Move away from the path of the landslide quickly.",
                    "If escape is not possible, curl into a tight ball and protect your head.",
                ]
            },
            {
                title: "After a Landslide",
                points: [
                    "Stay away from the slide area. There may be danger of additional slides.",
                    "Check for injured and trapped persons near the slide, without entering the direct slide area.",
                    "Listen for the latest emergency information."
                ]
            }
        ]
    },
     forestfire: {
        title: "Forest Fire Safety",
        icon: "flame",
        color: "red-600",
        description: "An uncontrolled fire in an area of combustible vegetation that occurs in the countryside or a wilderness area.",
        steps: [
             {
                title: "Before a Forest Fire",
                points: [
                    "Create a defensible space around your home by clearing flammable materials.",
                    "Have an evacuation plan and practice it.",
                    "Know the emergency notification systems for your area."
                ]
            },
            {
                title: "During a Forest Fire",
                points: [
                    "Evacuate immediately if told to do so.",
                    "Follow the evacuation route and don't take shortcuts.",
                    "Keep windows and doors closed to prevent smoke from entering."
                ]
            },
            {
                title: "After a Forest Fire",
                points: [
                    "Do not return home until authorities say it is safe.",
                    "Check for hot spots or embers that could reignite.",
                    "Be aware of potential hazards like damaged trees and power lines."
                ]
            }
        ]
    },
     gasleak: {
        title: "Gas Leakage Safety",
        icon: "wind",
        color: "green-600",
        description: "An unintended leak of natural gas or other gaseous products from a pipeline or other containment into any area where the gas should not be present.",
        steps: [
             {
                title: "Precautions",
                points: [
                    "Recognize the signs: a 'rotten egg' smell, a hissing sound, or dead vegetation in an otherwise green area.",
                    "If you suspect a leak, do NOT use any electronics, light matches, or turn on/off switches.",
                    "Evacuate the area immediately."
                ]
            },
            {
                title: "Emergency Steps",
                points: [
                    "Leave the building or area immediately.",
                    "From a safe distance, call your gas provider's emergency number or 112.",
                    "Do not re-enter the building until a professional has declared it safe."
                ]
            },
        ]
    },
    nuclear: {
        title: "Nuclear Incident Safety",
        icon: "atom",
        color: "purple-600",
        description: "An event involving a significant release of radioactivity that could be harmful to public health and the environment.",
        steps: [
            {
                title: "If a Nuclear Incident Occurs",
                points: [
                    "Get inside the nearest, most robust building.",
                    "Remove contaminated clothing and wash your body.",
                    "Stay tuned to emergency broadcasts for instructions."
                ]
            },
            {
                title: "Shelter in Place",
                points: [
                    "Go to a basement or the middle of the building, away from windows.",
                    "Seal doors, windows, and air vents with plastic sheeting and duct tape.",
                    "Wait for official instructions before going outside."
                ]
            }
        ]
    },
     terrorist: {
        title: "Terrorist Attack Safety",
        icon: "bomb",
        color: "red-800",
        description: "The unlawful use of violence and intimidation, especially against civilians, in the pursuit of political aims.",
        steps: [
            {
                title: "General Principles",
                points: [
                    "Be aware of your surroundings.",
                    "Have an escape route in mind in any public place.",
                    "Report suspicious activity to authorities."
                ]
            },
            {
                title: "If an Attack Occurs: Run, Hide, Fight",
                points: [
                    "<strong>Run:</strong> If there is a safe escape path, evacuate the area. Leave your belongings behind.",
                    "<strong>Hide:</strong> If you cannot escape, find a place to hide where the attacker is less likely to find you. Silence your phone.",
                    "<strong>Fight:</strong> As a last resort and only when your life is in immediate danger, act with physical aggression and commit to your actions."
                ]
            }
        ]
    }
};

