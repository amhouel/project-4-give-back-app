// Require model file here
const { User, VolunteeringOpportunity, VolunteerExperience } = require('./models')

// Create model instances here
const main = async () => {
     const opportunity1 = await VolunteeringOpportunity.create ({
        title: "Hunters Point Parks Conservancy BulbFest 2018",
        address: "Gantry Plaza State Park, 49th Avenue & Center Boulevard, New York, NY 11109",
        description: "Saturday October 28th, 2018 11am - 1PM. Join us for BulbFest 2018! We will be planting over 7,000 daffodil and tulip bulbs in Gantry Plaza State Park and Hunters Point South Park. Volunteers are needed to help bulbs that will bloom next Spring. Families are welcome, there will be activities for kids!",
        latitude: 40.744369,
        longitude: -73.958477,
        duration: "One time - 2 hours",
        organization: "Hunters Point Parks Conservancy",
        organizationURL: "https://www.hunterspointparks.org",
    });

    const opportunity2 = await VolunteeringOpportunity.create ({
        title: "LIC Volunteer Gardening Day",
        address: "Gantry Plaza State Park, 49th Avenue & Center Boulevard, New York, NY 11109",
        description: "Saturday October 27th, 2018, 10AM - 12PM. Enjoy the beautiful LIC waterfront and sunshine while you help keep our parks beautiful by planting, weeding and doing other gardening tasks. Meet at the Gantry Plaza at 48th & Center Boulevard by the chess tables",
        latitude: 40.744369,
        longitude: -73.958477,
        duration: "One time - 2 hours",
        organization: "Hunters Point Parks Conservancy",
        organizationURL: "https://www.hunterspointparks.org",
    });

    const opportunity3 = await VolunteeringOpportunity.create ({
        title: "Infant & Toddler Classroom Volunteers!",
        address: "197 East Broadway, New York, NY 10002",
        description: "Fall 2019. At the heart of Educational Alliance Preschool’s approach to early childhood education is relationships. Our teachers build deep attachment relationships with children by carefully observing them, modelling kindness and empathy, and providing high quality, responsive care. We’re looking for volunteers to work alongside this established team of educators in our Infant Classroom, serving children 3-24 months old. Morning shift M-F 9-11AM or afternoon shift M-F 4-6PM. To apply visit: https://cerv.is/m?0038gr4b4J3. Priority to candidates who are able to make a daily commitment",
        latitude: 40.714011,
        longitude: -73.988364,
        duration: "Ongoing opportunity",
        organization: "Manny Cantor Center",
        organizationURL: "https://www.mannycantor.org",
    });

    const opportunity4 = await VolunteeringOpportunity.create ({
        title: "Opportunity with Teens in Recreation!",
        address: "197 East Broadway, New York, NY 10002",
        description: "Help make our teens feel welcome and safe at MCC each day! The volunteer will work in the gym during open gym hours within the Teen Center at MCC on Fridays from 3:30pm-6:00pm (shifts available, mid-Sept. thru early-June). The ideal candidate will have a friendly and easy going personality, while also being self-aware and reliable. You will be managing informal scrimmages in the gym and running drills and workouts with the teens. It is a great experience for anyone looking to help or gain experience working with youth or in a community center environment. Whether you can make a commitment regularly or semi regularly, we'd love to have your help! This opportunity will begin in September 2018 and continue through the school year.",
        latitude: 40.714011,
        longitude: -73.988364,
        duration: "Ongoing - School year 2018",
        organization: "Manny Cantor Center",
        organizationURL: "https://www.mannycantor.org",
    });

    const opportunity5 = await VolunteeringOpportunity.create ({
        title: "Serve Lunch to Older Adults on LES!",
        address: "197 East Broadway, New York, NY 10002",
        description: "Help serve lunch to older adults on the Lower East Side to ensure they have a hot, healthy meal to eat! Each day about 150 seniors attend lunch at the Weinberg Center for Balanced living and our volunteer lunch servers are an integral part in ensuring it all goes smoothly. Doing everything from setting tables, plating food and delivering the meals to each table, it is always a fun and meaningful experience for all. The Weinberg Center for Balanced Living at Manny Cantor Center serves a diverse population of 60+ adults with everything from nutritious kosher meals, health and wellness programs, case workers, dance, art, language and fitness classes and a wide array of social events. Currently there are 4,000 members and growing to take advantage of this diverse array of mostly free programming. Shifts available M-F 11am-1pm. For more information and to register for a shift visit: http://cerv.is/m?0038gt0CwX7",
        latitude: 40.714011,
        longitude: -73.988364,
        duration: "Ongoing - 2 hours/day",
        organization: "Manny Cantor Center",
        organizationURL: "https://www.mannycantor.org",
    });

    const opportunity6 = await VolunteeringOpportunity.create ({
        title: "iMentor - Mentor a Student in NYC!",
        address: "30 Broad Street, 9th floor, New York, NY 10004",
        description: "The guidance of a mentor can empower a young person to graduate high school, succeed in college, and achieve their ambitions. iMentor is seeking college-educated New Yorkers to mentor students from public high schools in New York City's low-income communities. Using iMentor's dedicated curriculum and staff support, mentors and students work together, in-person and online, to develop strong personal relationships, nurture a college aspiration, navigate the college application process, and build critical skills that lead to college success. Mentors are expected to email their mentee once per week as well as meet with their mentee once per month at an event organized by iMentor. These events are Monday - Thursday, 6pm - 8pm. Mentors are required to support their mentee for 3 - 4 years. Please fill out & submit our Online Mentor Application at imentor.org or click the link below.",
        latitude: 40.706311,
        longitude: -74.011606,
        duration: "3-4 years",
        organization: "iMentor",
        organizationURL: "https://imentor.org",
    });

    const opportunity7 = await VolunteeringOpportunity.create ({
        title: "Are you good in math and reading?Become a tutor for a group of lively and humorous 6-17 year-olds",
        address: "50 Madison Street, New York, NY 10038",
        description: "Saturday October 20th, 2018 - Satuday June 22nd, 2019. Hamilton-Madison House is looking for volunteers on Saturdays from 11:00am till 3:30pm to help tutor and teach kids, ages 6-17, Math and Literacy. This is a great opportunity to gain valuable teaching experience as well as inspiring a love of learning in children. Program starts October 2018 and will run until June 2019.Volunteers must make at least a one month commitment.",
        latitude: 40.711673,
        longitude: -73.997972,
        duration: "8 months",
        organization: "Hamilton-Madison House",
        organizationURL: "http://www.hamiltonmadisonhouse.org",
    });

    const opportunity8 = await VolunteeringOpportunity.create ({
        title: "Be a scary ghost or princess",
        address: "50 Madison Street, New York, NY 10038",
        description: "Saturday October 27th, 2018, 10AM-3PM. Host a community Halloween party dressing in costume (child appropriate-not super scary or sexy), bring 2 bags of wrapped candy, do arts and crafts and games . special talents like magic are always appreciated. We are a community center located in a housing development close to Chinatwon.",
        latitude: 40.711673,
        longitude: -73.997972,
        duration: "5 hours",
        organization: "Hamilton-Madison House",
        organizationURL: "http://www.hamiltonmadisonhouse.org",
    });

    const opportunity9 = await VolunteeringOpportunity.create ({
        title: "Volunteer for HMH Boutique",
        address: "75 Catherine Street, New York, NY 10002",
        description: "Looking for a volunteer to assist in securing in-kind donations for our HMH Boutique. We need your help to:  Secure product donations for the boutique and for special events, conduct research on product donations such as pricing comparison, record and track incoming donations using Microsoft Excel, assist with event prep as needed, attend the events as a Volunteer as needed",
        latitude: 40.710974,
        longitude: -73.996480,
        duration: "Ongoing. 10-15 hours/ week",
        organization: "Hamilton-Madison House",
        organizationURL: "http://www.hamiltonmadisonhouse.org",
    });

    const opportunity10 = await VolunteeringOpportunity.create ({
        title: "Downtown Morning Runner",
        address: "227 Bowery, New York, NY 10013",
        description: "Go the extra mile with Back on My Feet NYC! Dedicated teams of volunteers run 2-4 miles with our members who are transitioning out of homelessness. We encourage runners of all speeds (run/jog/walk) to become a part of our community! Team City Hall runs with the NYC Rescue Mission at the NW corner of Collect Pond Park every Monday, Wednesday, and Friday from 5:45-6:45AM. To find out more and sign up for an orientation, visit nyc.backonmyfeet.org/nyc-run-with-us",
        latitude: 40.722005,
        longitude: -73.992773,
        duration: "Ongoing",
        organization: "Back On My Feet",
        organizationURL: "https://nyc.backonmyfeet.org",
    });

    const opportunity11 = await VolunteeringOpportunity.create ({
        title: "Volunteer Coach - Softball",
        address: "Battery Park Ballfields, New York, NY 10282",
        description: "Downtown Little League's Softball Program is looking for volunteer softball coaches to work with girls between the ages of 5-18 during our Spring, Fall, and Winter seasons. While open to all, we currently have a particular interest in finding more female volunteer coaches to teach the game and serve as role models for the girls in our program. We firmly believe that this will play a critical role in impacting the perceptions and future aspirations of our female athletes and how they see and understand leadership in the world. Games and practices will either be Friday (after work hours), Saturday, or Sunday. Times vary by season and age but it's generally 1 to 3 hours a week. You'll be placed on a team coaching staff so we're flexible and more than happy to work with you to find something that fits your schedule. To apply please contact us: Felix Zhang (felix.zhang21 at gmail.com) OR https://www.facebook.com/DLLSOFTBALL/",
        latitude: 40.716135,
        longitude: -74.014016,
        duration: "Ongoing. 1-3 hours/ week",
        organization: "Downtown Little League",
        organizationURL: "http://downtownlittleleague.org/site",
    });

    const opportunity12 = await VolunteeringOpportunity.create ({
        title: "9/11 Memorial & Museum: Visitor Services Volunteers",
        address: "9/11 Memorial Museum, 180 Greenwich St, New York, NY 10007",
        description: "Interact with people from all over the world. Honor, remember, and volunteer. Visitor Services volunteers play a critical role by connecting with visitors and providing a meaningful experience both on the 9/11 Memorial and in the Museum. We are seeking Visitor Services volunteers of all ages 16+ who are friendly, outgoing, and comfortable assisting Memorial & Museum visitors. Responsibilities include: Welcome and greet visitors, proactively offer assistance, answer questions,inform visitors about programs and exhibitions available inside the Museum, help with directions. With training, you can learn to provide excellent service to our visitors and help them remember 9/11. We recommend volunteers work a four-hour shift per week for at least six months. If you volunteer weekends, you have the option to volunteer one 4-hour shift every other week. We ask that you maintain the same shift each week, when possible. For more information and to apply, please visit www.911memorial.org/volunteer or contact us at volunteer@911memorial.org",
        latitude: 40.711515,
        longitude: -74.013432,
        duration: "Ongoing. 1-3 hours/ week",
        organization: "National September 11 Memorial & Museum",
        organizationURL: "https://www.911memorial.org",
    });

    const opportunity13 = await VolunteeringOpportunity.create ({
        title: "9/11 Memorial & Museum: Guided Tour Greeter Volunteers",
        address: "9/11 Memorial Museum, 180 Greenwich St, New York, NY 10007",
        description: "As a Guided Tour Greeter Volunteer, you will contribute towards the smooth operation of the Guided Tours Program in the Museum and on the 9/11 Memorial Plaza. You will assist with the operation of guided tours in the Museum and on the outdoor Memorial. You will assist Interpretive Programs staff with the following responsibilities: Greet visitors at the Guided Tours area in the Museum and the outdoor Memorial Tour Cart, inform visitors about tour options and other educational programming available, assist with checking in visitors for their tour time, assist with distributing tour equipment, advise visitors on equipment use and troubleshoot technology as necessary, explain basic Guided Tour protocol, assist with conducting guided tour surveys.",
        latitude: 40.711515,
        longitude: -74.013432,
        duration: "Ongoing. 3-hour shifts/ week",
        organization: "National September 11 Memorial & Museum",
        organizationURL: "https://www.911memorial.org",
    });

    const opportunity14 = await VolunteeringOpportunity.create ({
        title: "9/11 Memorial & Museum: Retail Volunteers",
        address: "9/11 Memorial Museum, 180 Greenwich St, New York, NY 10007",
        description: "Retail Greeter volunteers assist the staff at the Museum store and outdoors on the Retail information carts. Volunteers greet visitors and provide them with helpful information that enhances their visit. Duties include: Welcome and proactively greet visitors, inform visitors about the products available and store promotions. Share information on how products link to exhibition themes in the Museum, assist visitors with directions and provide excellent customer service, assist with tasks such as tagging, folding t-shirts and restocking items. Retail Greeter volunteers work at least four hours per week (typical hours are 11 a.m. - 3 p.m.) for at least six months. It is also requested that volunteers maintain the same shifts each week. The Museum store is open every day. For more information and to apply, please visit: www.911memorial.org/volunteer",
        latitude: 40.711515,
        longitude: -74.013432,
        duration: "Ongoing. 4-hour/week for 6 months minimum",
        organization: "National September 11 Memorial & Museum",
        organizationURL: "https://www.911memorial.org",
    });

    const opportunity15 = await VolunteeringOpportunity.create ({
        title: "Become a reading partner- make a lifelong impact on a child",
        address: "80 Catherine St., New York, NY 10038",
        description: "Reading Partners needs volunteers like you to provide students in under-resourced elementary schools in your community with the proven, individualized reading support they need to read at grade level by fourth grade. Reading is the foundation for all future learning. The ability to read transforms lives and can empower children to reach their full potential. Research shows that when students can read at grade level by fourth grade, they have a greater opportunity to succeed in school and in life. With your help, we can equip students with the foundational skills they need to read at grade level. Each week, you will meet one-on-one with your student every week to help them develop strong literacy skills and discover a passion for reading. We'll provide a structured curriculum, in-person training, and ongoing support to help your student thrive. Rigorous research has proven that Reading Partners significantly increases reading proficiency. No teaching experience required and anyone over the age of 14 can volunteer. Session times are flexible: (Monday to Thursday, with volunteer times between 9 and 5). Visit our website at www.readingpartners.org/volunteer to sign up and learn more.",
        latitude: 40.710585,
        longitude: -73.996984,
        duration: "Ongoing. 1 hour/week minimum",
        organization: "Reading Partners",
        organizationURL: "https://readingpartners.org",
    });

    const opportunity16 = await VolunteeringOpportunity.create ({
        title: "Volunteer with One Brick and Rescuing Leftover Cuisine",
        address: "67 Wall St., New York, NY 10013",
        description: "Sunday October 28th, 2018, 5PM - 6PM. Help rescue some prepared food and drinks from a restaurant in the Financial District! We will deliver the food to the NYC Rescue Mission, located at 90 Lafayette St, New York NY 10013. Mediumweight: the average amount of food rescued from this event is 20-40 pounds. WHAT YOU SHOULD KNOW: this event meets rain or shine, so please dress appropriately!",
        latitude: 40.705547,
        longitude: -74.008403,
        duration: "One time. 1 hour",
        organization: "One Brick",
        organizationURL: "https://www.onebrick.org",
    });

    const opportunity17 = await VolunteeringOpportunity.create ({
        title: "Walk to End Alzheimer\'s",
        address: "Pier 17, South Street Seaport, New York, NY 10038",
        description: "Saturday October 27th, 2018, 7AM - 12PM. Volunteers will be assisting in the 2018 Manhattan Walk to End Alzheimer’s Promise Garden, helping with flower assembly and handing out flowers to walkers the day of the walk. Some volunteers may also serve as greeters. All volunteers will meet at the front of Pier 17 at the check-in tent.",
        latitude: 40.705497,
        longitude: -74.001556,
        duration: "One time. 5 hours",
        organization: "One Brick",
        organizationURL: "https://www.onebrick.org",
    });

    const opportunity18 = await VolunteeringOpportunity.create ({
        title: "Get Out The Vote Phone Bank for the General Election - Monday November 5th, 2018",
        address: "100 Church Street, 12th Floor, New York, NY 10007",
        description: "Saturday November 3rd, 2018, 12PM - 4PM. Volunteers for the NYC Votes Get Out the Vote Phone Bank will call voters and deliver a voting themed message and provide information about voting. Making sure that our fellow voters know when and how to participate in the democratic process is part of civic engagement, and conducting GOTV calls is a great way to get involved. Will you be part of making a difference this fall? There will be a training at the beginning of the session. Phones, call lists and scripts will be provided. This initiative in nonpartisan.",
        latitude: 40.713207,
        longitude: -74.010201,
        duration: "One time. 4 hours",
        organization: "New York Campaign Finance Board NYC Votes",
        organizationURL: "https://www.nyccfb.info/nyc-votes/",
    });

    const opportunity19 = await VolunteeringOpportunity.create ({
        title: "Get Out The Vote Phone Bank for the General Election - Sunday November 4th, 2018",
        address: "100 Church Street, 12th Floor, New York, NY 10007",
        description: "Sunday November 4th, 2018, 12PM - 4PM. Volunteers for the NYC Votes Get Out the Vote Phone Bank will call voters and deliver a voting themed message and provide information about voting. Making sure that our fellow voters know when and how to participate in the democratic process is part of civic engagement, and conducting GOTV calls is a great way to get involved. Will you be part of making a difference this fall? There will be a training at the beginning of the session. Phones, call lists and scripts will be provided. This initiative in nonpartisan.",
        latitude: 40.713207,
        longitude: -74.010201,
        duration: "One time. 4 hours",
        organization: "New York Campaign Finance Board NYC Votes",
        organizationURL: "https://www.nyccfb.info/nyc-votes/",
    });

    const opportunity20 = await VolunteeringOpportunity.create ({
        title: "Get Out The Vote Phone Bank for the General Election - Monday November 5th, 2018",
        address: "100 Church Street, 12th Floor, New York, NY 10007",
        description: "Monday November 5th, 2018, 4PM - 8PM. Volunteers for the NYC Votes Get Out the Vote Phone Bank will call voters and deliver a voting themed message and provide information about voting. Making sure that our fellow voters know when and how to participate in the democratic process is part of civic engagement, and conducting GOTV calls is a great way to get involved. Will you be part of making a difference this fall? There will be a training at the beginning of the session. Phones, call lists and scripts will be provided. This initiative in nonpartisan.",
        latitude: 40.713207,
        longitude: -74.010201,
        duration: "One time. 4 hours",
        organization: "New York Campaign Finance Board NYC Votes",
        organizationURL: "https://www.nyccfb.info/nyc-votes/",
    });

    const opportunity21 = await VolunteeringOpportunity.create ({
        title: "Get Out The Vote Phone Bank for the General Election - Tuesday November 6th, 2018",
        address: "100 Church Street, 12th Floor, New York, NY 10007",
        description: "Tuesday November 6th, 2018, 4PM - 8PM. Volunteers for the NYC Votes Get Out the Vote Phone Bank will call voters and deliver a voting themed message and provide information about voting. Making sure that our fellow voters know when and how to participate in the democratic process is part of civic engagement, and conducting GOTV calls is a great way to get involved. Will you be part of making a difference this fall? There will be a training at the beginning of the session. Phones, call lists and scripts will be provided. This initiative in nonpartisan.",
        latitude: 40.713207,
        longitude: -74.010201,
        duration: "One time. 4 hours/ day",
        organization: "New York Campaign Finance Board NYC Votes",
        organizationURL: "https://www.nyccfb.info/nyc-votes/",
    });

    const user1 = await User.create ({
        fullName: "Fred Flintstone",
        dob: "1960-10-06",
        address: "10 E 21st street, New York, NY 10010",
        username: "fred",
        passwordDigest: "$2a$12$OL80z0Mhp4ZzTVjKSVzUGu4nlXWksp07fxwApYQX5ASaL0dPjhT/O",
        email: "fred@gmail.com",
        profilePicture: "",
        score: 0,
    });

    await user1.addVolunteeringOpportunity(opportunity1);
    await user1.addVolunteeringOpportunity(opportunity5);
    await user1.addVolunteeringOpportunity(opportunity11);

    process.exit();
}

main();