import type { Course } from "./courses";

// Brand names and technical terms are retained in both locales.
export const programmingPrograms: Course[] = [
  {
    slug: "scratchjr",
    name: "ScratchJr",
    program: true,
    faq: [
      {
        q: {
          ar: "التعلم بيكون إزاي؟",
          en: "How does learning work?",
        },
        a: {
          ar: "أونلاين مباشر في مجموعات صغيرة، مع شرح وتطبيق ومراجعة مع المدرب. اسألنا عن المواعيد المتاحة.",
          en: "Live online in small groups, with explanations, practice and instructor review. Ask us about available schedules.",
        },
      },
      {
        q: {
          ar: "السن المقترح شرط للتسجيل؟",
          en: "Is the recommended age a registration requirement?",
        },
        a: {
          ar: "السن استرشادي، وبنحدد المستوى المناسب حسب استعداد الطالب وخبرته.",
          en: "Age is a guideline. We choose a suitable level based on the learner’s readiness and experience.",
        },
      },
      {
        q: {
          ar: "الاستفسار بيأكد الحجز؟",
          en: "Does an inquiry confirm a booking?",
        },
        a: {
          ar: "إرسال الاستفسار مش تأكيد للحجز. فريق الأكاديمية هيوضحلك التفاصيل وخطوات الحجز، والسعر لكل طالب لكل مستوى.",
          en: "An inquiry does not confirm a booking. The academy team explains available schedules and booking steps. Prices are per learner and level.",
        },
      },
    ],
    color: "#f4b65f",
    symbol: "ScratchJr",
    price: 700,
    oldPrice: 900,
    sessions: 4,
    hours: 8,
    difficulty: "beginner",
    category: "languages",
    ageRecommendation: {
      en: "Ages 5–7",
      ar: "من ٥ لـ٧ سنين",
    },
    cardDescription: {
      ar: "قصص وحركة بالبلوكات. السن المقترح ٥–٧ سنين، حسب استعداد الطفل.",
      en: "Stories and movement with blocks. Recommended for ages 5–7, depending on your child’s readiness.",
    },
    description: {
      ar: "بداية ممتعة للبرمجة بالبلوكات. طفلك بيحرّك الشخصيات وبيحكي قصصه، خطوة بخطوة وبأنشطة مناسبة لسنه.",
      en: "A playful introduction to block programming. Your child moves characters and tells stories, step by step, through age-appropriate activities.",
    },
    prerequisites: {
      ar: "مش محتاج خبرة سابقة. محتاج تابلت أو جهاز متوافق مع ScratchJr، ومساعدة ولي الأمر في التجهيز.",
      en: "No previous experience needed. Bring a tablet or device compatible with ScratchJr, with a parent or guardian helping with setup.",
    },
    levels: [
      {
        ar: "الأساسيات",
        en: "Fundamentals",
        id: "scratchjr-level-1",
        slug: "level-1",
        price: 700,
        oldPrice: 900,
        hoursPerSession: 2,
        prerequisites: {
          ar: "مش محتاج أي خبرة في البرمجة.",
          en: "No previous programming experience needed.",
        },
        project: {
          ar: "قصة متحركة بشخصيات بتتحرك مع بعض بتوقيت متناسق.",
          en: "An animated story with characters moving together in a coordinated sequence.",
        },
        outcomes: [
          {
            ar: "يتعرف على الواجهة ويختار شخصيات وخلفيات.",
            en: "Explore the interface and choose characters and backgrounds.",
          },
          {
            ar: "يرتب بلوكات الحركة ويستخدم التكرار والأحداث.",
            en: "Arrange movement blocks and use repetition and events.",
          },
          {
            ar: "يعمل قصة قصيرة ويجربها ويصلّح خطواتها.",
            en: "Create a short story, test it and fix its sequence.",
          },
        ],
        sessions: [
          {
            number: 1,
            title: {
              ar: "نتعرف على ScratchJr",
              en: "Meet ScratchJr",
            },
            topics: [
              {
                ar: "الواجهة والشخصيات والخلفيات",
                en: "The interface, characters and backgrounds",
              },
              {
                ar: "بلوكات الحركة",
                en: "Movement blocks",
              },
            ],
            practiceTask: {
              ar: "نجهز مشهد ونحرّك شخصية فيه.",
              en: "Set up a scene and move a character through it.",
            },
            learningObjectives: [
              {
                ar: "نجهز مشهد ونحرّك شخصية فيه.",
                en: "Set up a scene and move a character through it.",
              },
            ],
          },
          {
            number: 2,
            title: {
              ar: "نرتب الخطوات",
              en: "Arrange the Steps",
            },
            topics: [
              {
                ar: "تسلسل الأوامر والاتجاهات",
                en: "Command sequences and directions",
              },
              {
                ar: "الحركة والتوقيت وتمارين عملية",
                en: "Movement, timing and practical exercises",
              },
            ],
            practiceTask: {
              ar: "نرتب حركة الشخصية عشان توصل لمكان محدد.",
              en: "Arrange a character’s movements to reach a chosen destination.",
            },
            learningObjectives: [
              {
                ar: "نرتب حركة الشخصية عشان توصل لمكان محدد.",
                en: "Arrange a character’s movements to reach a chosen destination.",
              },
            ],
          },
          {
            number: 3,
            title: {
              ar: "نحكي قصة بالحركة",
              en: "Tell a Story with Movement",
            },
            topics: [
              {
                ar: "التكرار والأحداث",
                en: "Repetition and events",
              },
              {
                ar: "الرسوم المتحركة وحكي القصص",
                en: "Animation and storytelling",
              },
            ],
            practiceTask: {
              ar: "نعمل مشهد قصير فيه حركة بتتكرر وحدث بيبدأها.",
              en: "Create a short scene with repeated movement triggered by an event.",
            },
            learningObjectives: [
              {
                ar: "نعمل مشهد قصير فيه حركة بتتكرر وحدث بيبدأها.",
                en: "Create a short scene with repeated movement triggered by an event.",
              },
            ],
          },
          {
            number: 4,
            title: {
              ar: "مشروعي الأول",
              en: "My First Project",
            },
            topics: [
              {
                ar: "قصة متحركة بإرشاد المدرب",
                en: "An animated story with instructor guidance",
              },
              {
                ar: "مراجعة وتقييم عملي",
                en: "Review and practical assessment",
              },
            ],
            practiceTask: {
              ar: "نكمل قصة بشخصيات متناسقة ونجرب ترتيب الحركة.",
              en: "Complete a story with coordinated characters and test the movement sequence.",
            },
            learningObjectives: [
              {
                ar: "نكمل قصة بشخصيات متناسقة ونجرب ترتيب الحركة.",
                en: "Complete a story with coordinated characters and test the movement sequence.",
              },
            ],
          },
        ],
        overview: {
          en: "Explore characters, movement, sequences and events, then build a short animated story with instructor guidance.",
          ar: "نتعرف على الشخصيات والحركة وترتيب الخطوات والأحداث، وبعدها نبني قصة متحركة قصيرة بإرشاد المدرب.",
        },
      },
      {
        ar: "مشاريع إبداعية",
        en: "Creative Projects",
        id: "scratchjr-level-2",
        slug: "level-2",
        price: 700,
        oldPrice: 900,
        hoursPerSession: 2,
        prerequisites: {
          ar: "إكمال المستوى الأول من ScratchJr أو معرفة مكافئة بنحددها مع بعض.",
          en: "Complete ScratchJr level 1 or have equivalent knowledge that we assess together.",
        },
        project: {
          ar: "قصة تفاعلية بأكتر من مشهد أو لعبة بسيطة.",
          en: "An interactive story with more than one scene, or a simple game.",
        },
        outcomes: [
          {
            ar: "ينظم قصة بأكتر من شخصية ومشهد.",
            en: "Organize a story with several characters and scenes.",
          },
          {
            ar: "يستخدم الرسائل عشان ينسق الشخصيات.",
            en: "Use messages to coordinate characters.",
          },
          {
            ar: "يجمع الحركة والصوت والأحداث في مشروع تفاعلي بسيط.",
            en: "Combine movement, sound and events in a simple interactive project.",
          },
        ],
        sessions: [
          {
            number: 1,
            title: {
              ar: "شخصيات أكتر وقصة أوضح",
              en: "More Characters, Clearer Stories",
            },
            topics: [
              {
                ar: "مراجعة الأساسيات",
                en: "Review the fundamentals",
              },
              {
                ar: "مشاهد بأكتر من شخصية وتطوير حكي القصة",
                en: "Scenes with multiple characters and developing a story",
              },
            ],
            practiceTask: {
              ar: "نخطط قصة قصيرة بشخصيتين وأدوار واضحة.",
              en: "Plan a short story with two characters and clear roles.",
            },
            learningObjectives: [
              {
                ar: "نخطط قصة قصيرة بشخصيتين وأدوار واضحة.",
                en: "Plan a short story with two characters and clear roles.",
              },
            ],
          },
          {
            number: 2,
            title: {
              ar: "الرسائل والمشاهد",
              en: "Messages and Scenes",
            },
            topics: [
              {
                ar: "الرسائل وتزامن الشخصيات",
                en: "Messages and coordinating characters",
              },
              {
                ar: "استخدام أكتر من صفحة",
                en: "Using more than one page",
              },
            ],
            practiceTask: {
              ar: "نبعت رسالة بين شخصيتين وننقل القصة لصفحة تانية.",
              en: "Send a message between two characters and move the story to another page.",
            },
            learningObjectives: [
              {
                ar: "نبعت رسالة بين شخصيتين وننقل القصة لصفحة تانية.",
                en: "Send a message between two characters and move the story to another page.",
              },
            ],
          },
          {
            number: 3,
            title: {
              ar: "نجمع أدواتنا",
              en: "Combine Our Tools",
            },
            topics: [
              {
                ar: "دمج الأحداث والتكرار",
                en: "Combining events and repetition",
              },
              {
                ar: "الحركة والصوت",
                en: "Movement and sound",
              },
            ],
            practiceTask: {
              ar: "نعمل مشهد تفاعلي قصير بيجمع الأدوات اللي اتعلمناها.",
              en: "Create a short interactive scene that brings together the tools we have learned.",
            },
            learningObjectives: [
              {
                ar: "نعمل مشهد تفاعلي قصير بيجمع الأدوات اللي اتعلمناها.",
                en: "Create a short interactive scene that brings together the tools we have learned.",
              },
            ],
          },
          {
            number: 4,
            title: {
              ar: "نجرّب ونطوّر المشروع",
              en: "Test and Improve the Project",
            },
            topics: [
              {
                ar: "قصة تفاعلية أو لعبة بسيطة",
                en: "An interactive story or a simple game",
              },
              {
                ar: "اختبار المشروع وتقييم عملي",
                en: "Project testing and practical assessment",
              },
            ],
            practiceTask: {
              ar: "نكمل المشروع ونجربه ونصلّح الخطوات اللي محتاجة تعديل.",
              en: "Complete the project, test it and fix any steps that need adjusting.",
            },
            learningObjectives: [
              {
                ar: "نكمل المشروع ونجربه ونصلّح الخطوات اللي محتاجة تعديل.",
                en: "Complete the project, test it and fix any steps that need adjusting.",
              },
            ],
          },
        ],
        overview: {
          en: "Build on movement and events with messages, sound and multiple scenes to create a small interactive project.",
          ar: "نبني على الحركة والأحداث باستخدام الرسائل والصوت وأكتر من مشهد، عشان نعمل مشروع تفاعلي صغير.",
        },
      },
    ],
    audience: {
      en: "Children aged around 5–7, depending on readiness, with a parent or guardian helping with setup.",
      ar: "للأطفال من حوالي ٥ لـ٧ سنين حسب الاستعداد، مع مساعدة ولي الأمر في التجهيز.",
    },
  },
  {
    slug: "scratch",
    name: "Scratch",
    program: true,
    faq: [
      {
        q: {
          ar: "التعلم بيكون إزاي؟",
          en: "How does learning work?",
        },
        a: {
          ar: "أونلاين مباشر في مجموعات صغيرة، مع شرح وتطبيق ومراجعة مع المدرب. اسألنا عن المواعيد المتاحة.",
          en: "Live online in small groups, with explanations, practice and instructor review. Ask us about available schedules.",
        },
      },
      {
        q: {
          ar: "السن المقترح شرط للتسجيل؟",
          en: "Is the recommended age a registration requirement?",
        },
        a: {
          ar: "السن استرشادي، وبنحدد المستوى المناسب حسب استعداد الطالب وخبرته.",
          en: "Age is a guideline. We choose a suitable level based on the learner’s readiness and experience.",
        },
      },
      {
        q: {
          ar: "الاستفسار بيأكد الحجز؟",
          en: "Does an inquiry confirm a booking?",
        },
        a: {
          ar: "إرسال الاستفسار مش تأكيد للحجز. فريق الأكاديمية هيوضحلك التفاصيل وخطوات الحجز، والسعر لكل طالب لكل مستوى.",
          en: "An inquiry does not confirm a booking. The academy team explains available schedules and booking steps. Prices are per learner and level.",
        },
      },
    ],
    color: "#b5a3ef",
    symbol: "Scratch",
    price: 800,
    oldPrice: 1000,
    sessions: 4,
    hours: 8,
    difficulty: "beginner",
    category: "languages",
    ageRecommendation: {
      en: "Ages 8–12",
      ar: "من ٨ لـ١٢ سنة",
    },
    cardDescription: {
      ar: "نتعلم البرمجة ونبني ألعاب بالبلوكات. السن المقترح ٨–١٢ سنة، حسب الاستعداد.",
      en: "Learn programming and build games with blocks. Recommended for ages 8–12, depending on readiness.",
    },
    description: {
      ar: "نتعلم نفكر بمنطق البرمجة ونبني ألعاب تفاعلية بالبلوكات، من أول حركة لحد النقاط ومراحل التقدم.",
      en: "Learn to think with programming logic and build interactive games with blocks, from your first movement to scores and game progression.",
    },
    prerequisites: {
      ar: "جهاز كمبيوتر وإنترنت، ومعرفة بسيطة باستخدام الماوس والكيبورد. مش لازم تكون اتعلمت ScratchJr.",
      en: "A computer, internet connection and basic mouse and keyboard skills. Previous ScratchJr experience is not required.",
    },
    levels: [
      {
        ar: "أساسيات البرمجة",
        en: "Programming Fundamentals",
        id: "scratch-level-1",
        slug: "level-1",
        price: 800,
        oldPrice: 1000,
        hoursPerSession: 2,
        prerequisites: {
          ar: "مش محتاج خبرة سابقة في البرمجة؛ يكفي استخدام بسيط للكمبيوتر.",
          en: "No previous programming experience needed; basic computer skills are enough.",
        },
        project: {
          ar: "لعبة تفاعلية بقواعد بسيطة وواضحة.",
          en: "An interactive game with simple, clear rules.",
        },
        outcomes: [
          {
            ar: "يستخدم Sprites وMotion وLooks وEvents.",
            en: "Use sprites, Motion, Looks and Events.",
          },
          {
            ar: "يرتب الأوامر ويستخدم Loops والشروط.",
            en: "Arrange commands and use loops and conditions.",
          },
          {
            ar: "يبني لعبة بسيطة ويختبر قواعدها.",
            en: "Build a simple game and test its rules.",
          },
        ],
        sessions: [
          {
            number: 1,
            title: {
              ar: "أول خطواتنا في Scratch",
              en: "First Steps in Scratch",
            },
            topics: [
              {
                ar: "الواجهة وSprites",
                en: "The interface and sprites",
              },
              {
                ar: "Motion وLooks وEvents",
                en: "Motion, Looks and Events",
              },
            ],
            practiceTask: {
              ar: "نجهز شخصية ونخليها تتحرك وتتفاعل مع حدث.",
              en: "Set up a character and make it move and respond to an event.",
            },
            learningObjectives: [
              {
                ar: "نجهز شخصية ونخليها تتحرك وتتفاعل مع حدث.",
                en: "Set up a character and make it move and respond to an event.",
              },
            ],
          },
          {
            number: 2,
            title: {
              ar: "التسلسل والتكرار",
              en: "Sequences and Repetition",
            },
            topics: [
              {
                ar: "ترتيب الأوامر وLoops",
                en: "Command sequences and loops",
              },
              {
                ar: "Control والتوقيت",
                en: "Control and timing",
              },
            ],
            practiceTask: {
              ar: "نبرمج حركة متكررة بتوقيت واضح.",
              en: "Program a repeated movement with clear timing.",
            },
            learningObjectives: [
              {
                ar: "نبرمج حركة متكررة بتوقيت واضح.",
                en: "Program a repeated movement with clear timing.",
              },
            ],
          },
          {
            number: 3,
            title: {
              ar: "اللعبة تاخد قرار",
              en: "Let the Game Decide",
            },
            topics: [
              {
                ar: "الشروط وSensing",
                en: "Conditions and Sensing",
              },
              {
                ar: "أساسيات Operators ومنطق اللعبة",
                en: "Operator basics and game logic",
              },
            ],
            practiceTask: {
              ar: "نضيف شرط يغير سلوك الشخصية لما تلمس هدف.",
              en: "Add a condition that changes a character’s behavior when it touches a target.",
            },
            learningObjectives: [
              {
                ar: "نضيف شرط يغير سلوك الشخصية لما تلمس هدف.",
                en: "Add a condition that changes a character’s behavior when it touches a target.",
              },
            ],
          },
          {
            number: 4,
            title: {
              ar: "نبني لعبة تفاعلية",
              en: "Build an Interactive Game",
            },
            topics: [
              {
                ar: "تجميع لعبة بقواعد بسيطة",
                en: "Putting together a game with simple rules",
              },
              {
                ar: "اختبار وتقييم عملي",
                en: "Testing and practical assessment",
              },
            ],
            practiceTask: {
              ar: "نكمل اللعبة ونجرب القواعد ونصلّح الأخطاء.",
              en: "Complete the game, test the rules and fix errors.",
            },
            learningObjectives: [
              {
                ar: "نكمل اللعبة ونجرب القواعد ونصلّح الأخطاء.",
                en: "Complete the game, test the rules and fix errors.",
              },
            ],
          },
        ],
        overview: {
          en: "Use sprites, events, loops and conditions to build and test a small interactive game with clear rules.",
          ar: "نستخدم Sprites وEvents وLoops والشروط عشان نبني ونجرب لعبة تفاعلية صغيرة بقواعد واضحة.",
        },
      },
      {
        ar: "تطوير الألعاب",
        en: "Game Development",
        id: "scratch-level-2",
        slug: "level-2",
        price: 800,
        oldPrice: 1000,
        hoursPerSession: 2,
        prerequisites: {
          ar: "إكمال المستوى الأول من Scratch أو معرفة مكافئة بالتكرار والشروط والأحداث.",
          en: "Complete Scratch level 1 or have equivalent knowledge of loops, conditions and events.",
        },
        project: {
          ar: "لعبة قابلة للعب فيها نقاط وتدرج في التقدم.",
          en: "A playable game with a score and progressive stages.",
        },
        outcomes: [
          {
            ar: "يدير النقاط والمحاولات وحالة اللعبة.",
            en: "Manage scores, attempts and game state.",
          },
          {
            ar: "يستخدم Clones وBroadcasts وقوائم بسيطة.",
            en: "Use clones, broadcasts and simple lists.",
          },
          {
            ar: "ينظم أجزاء اللعبة بـCustom Blocks ويجرب المشروع كامل.",
            en: "Organize parts of the game with custom blocks and test the whole project.",
          },
        ],
        sessions: [
          {
            number: 1,
            title: {
              ar: "نقاط وحالة اللعبة",
              en: "Scores and Game State",
            },
            topics: [
              {
                ar: "Variables وعدّاد النقاط",
                en: "Variables and a score counter",
              },
              {
                ar: "إدارة حالة اللعبة",
                en: "Managing game state",
              },
            ],
            practiceTask: {
              ar: "نضيف عداد نقاط ونحدثه لما اللاعب يحقق هدف.",
              en: "Add a score counter and update it when the player reaches a goal.",
            },
            learningObjectives: [
              {
                ar: "نضيف عداد نقاط ونحدثه لما اللاعب يحقق هدف.",
                en: "Add a score counter and update it when the player reaches a goal.",
              },
            ],
          },
          {
            number: 2,
            title: {
              ar: "محاولات ونهاية اللعبة",
              en: "Attempts and Game Over",
            },
            topics: [
              {
                ar: "شروط مركبة وSensing",
                en: "Compound conditions and Sensing",
              },
              {
                ar: "المحاولات ومنطق Game Over",
                en: "Attempts and Game Over logic",
              },
            ],
            practiceTask: {
              ar: "نحدد عدد المحاولات ونوقف اللعبة عند نهايتها.",
              en: "Set the number of attempts and stop the game when they run out.",
            },
            learningObjectives: [
              {
                ar: "نحدد عدد المحاولات ونوقف اللعبة عند نهايتها.",
                en: "Set the number of attempts and stop the game when they run out.",
              },
            ],
          },
          {
            number: 3,
            title: {
              ar: "ننظم ونكرر بذكاء",
              en: "Organize and Repeat Smartly",
            },
            topics: [
              {
                ar: "Clones وBroadcasts",
                en: "Clones and broadcasts",
              },
              {
                ar: "أساسيات Lists وCustom Blocks",
                en: "Introduction to lists and custom blocks",
              },
            ],
            practiceTask: {
              ar: "نجرب نسخ شخصية ورسائل بينها، وننظم جزء صغير من الكود.",
              en: "Try cloning a character and sending messages between characters, then organize a small part of the code.",
            },
            learningObjectives: [
              {
                ar: "نجرب نسخ شخصية ورسائل بينها، وننظم جزء صغير من الكود.",
                en: "Try cloning a character and sending messages between characters, then organize a small part of the code.",
              },
            ],
          },
          {
            number: 4,
            title: {
              ar: "لعبتنا الكاملة",
              en: "Our Complete Game",
            },
            topics: [
              {
                ar: "استكمال لعبة صغيرة",
                en: "Completing a small game",
              },
              {
                ar: "Testing وDebugging وعرض المشروع",
                en: "Testing, debugging and presenting the project",
              },
            ],
            practiceTask: {
              ar: "نجرب النقاط والتقدم ونصلّح الأخطاء ونشرح اللعبة.",
              en: "Test scoring and progression, fix errors and explain the game.",
            },
            learningObjectives: [
              {
                ar: "نجرب النقاط والتقدم ونصلّح الأخطاء ونشرح اللعبة.",
                en: "Test scoring and progression, fix errors and explain the game.",
              },
            ],
          },
        ],
        overview: {
          en: "Extend a small game with scores, attempts and progression, then organize and test it using Scratch’s game-building tools.",
          ar: "نطور لعبة صغيرة بالنقاط والمحاولات والتقدم، وبعدها ننظمها ونجربها باستخدام أدوات Scratch لبناء الألعاب.",
        },
      },
    ],
    audience: {
      en: "Learners aged around 8–12 who want to learn programming logic through small games, depending on readiness.",
      ar: "للطلاب من حوالي ٨ لـ١٢ سنة اللي عايزين يتعلموا منطق البرمجة من خلال ألعاب صغيرة، حسب الاستعداد.",
    },
  },
  {
    slug: "python",
    name: "Python",
    program: true,
    faq: [
      {
        q: {
          ar: "التعلم بيكون إزاي؟",
          en: "How does learning work?",
        },
        a: {
          ar: "أونلاين مباشر في مجموعات صغيرة، مع شرح وتطبيق ومراجعة مع المدرب. اسألنا عن المواعيد المتاحة.",
          en: "Live online in small groups, with explanations, practice and instructor review. Ask us about available schedules.",
        },
      },
      {
        q: {
          ar: "السن المقترح شرط للتسجيل؟",
          en: "Is the recommended age a registration requirement?",
        },
        a: {
          ar: "السن استرشادي، وبنحدد المستوى المناسب حسب استعداد الطالب وخبرته.",
          en: "Age is a guideline. We choose a suitable level based on the learner’s readiness and experience.",
        },
      },
      {
        q: {
          ar: "الاستفسار بيأكد الحجز؟",
          en: "Does an inquiry confirm a booking?",
        },
        a: {
          ar: "إرسال الاستفسار مش تأكيد للحجز. فريق الأكاديمية هيوضحلك التفاصيل وخطوات الحجز، والسعر لكل طالب لكل مستوى.",
          en: "An inquiry does not confirm a booking. The academy team explains available schedules and booking steps. Prices are per learner and level.",
        },
      },
    ],
    color: "#74b9e8",
    symbol: "Py",
    price: 1000,
    oldPrice: 1200,
    sessions: 5,
    hours: 10,
    difficulty: "beginner",
    category: "languages",
    ageRecommendation: {
      en: "Ages 12 and up",
      ar: "من ١٢ سنة وطالع",
    },
    cardDescription: {
      ar: "بداية عملية لكتابة الكود. السن المقترح ١٢ سنة وطالع، مع مرونة حسب الاستعداد.",
      en: "A practical introduction to writing code. Recommended for ages 12 and up, with flexibility according to readiness.",
    },
    description: {
      ar: "بداية عملية لكتابة الكود بـPython. نبني أساس في المتغيرات والشروط والحلقات، وبعدها نستخدم الدوال ونتعامل مع الأخطاء في تطبيق صغير.",
      en: "A practical start to writing Python code. Build a foundation in variables, conditions and loops, then use functions and handle errors in a small application.",
    },
    prerequisites: {
      ar: "كمبيوتر وإنترنت ومعرفة بسيطة بالكيبورد والملفات. بنساعدك تجهز Python قبل البداية.",
      en: "A computer, internet connection and basic keyboard and file skills. We help you set up Python before the course starts.",
    },
    levels: [
      {
        ar: "أساسيات Python",
        en: "Python Fundamentals",
        id: "python-level-1",
        slug: "level-1",
        price: 1000,
        oldPrice: 1200,
        hoursPerSession: 2,
        prerequisites: {
          ar: "مش محتاج خبرة سابقة في البرمجة. محتاج كمبيوتر وتجهيز Python بمساعدتنا.",
          en: "No previous programming experience needed. Bring a computer and set up Python with our help.",
        },
        project: {
          ar: "برنامج تفاعلي في سطر الأوامر بيستخدم الشروط والحلقات، زي اختبار أسئلة قصير.",
          en: "An interactive command-line program using conditions and loops, such as a short quiz.",
        },
        outcomes: [
          {
            ar: "يكتب كود بسيط ويستخدم المتغيرات والنصوص.",
            en: "Write simple code and work with variables and strings.",
          },
          {
            ar: "يقرأ إدخال المستخدم ويستخدم الشروط.",
            en: "Read user input and use conditions.",
          },
          {
            ar: "يختار مجموعة بيانات مناسبة ويكرر الخطوات بحلقات.",
            en: "Choose a suitable data collection and repeat steps using loops.",
          },
        ],
        sessions: [
          {
            number: 1,
            title: {
              ar: "نبدأ كتابة Python",
              en: "Start Writing Python",
            },
            topics: [
              {
                ar: "Introduction وGetting Started وSyntax",
                en: "Introduction, getting started and syntax",
              },
              {
                ar: "Output وComments وVariables",
                en: "Output, comments and variables",
              },
            ],
            practiceTask: {
              ar: "نكتب برنامج ترحيب صغير ونغير البيانات بالمتغيرات.",
              en: "Write a small greeting program and change its data using variables.",
            },
            learningObjectives: [
              {
                ar: "نكتب برنامج ترحيب صغير ونغير البيانات بالمتغيرات.",
                en: "Write a small greeting program and change its data using variables.",
              },
            ],
          },
          {
            number: 2,
            title: {
              ar: "البيانات والنصوص",
              en: "Data and Strings",
            },
            topics: [
              {
                ar: "Data Types وNumbers وCasting",
                en: "Data types, numbers and casting",
              },
              {
                ar: "Strings وString Formatting",
                en: "Strings and string formatting",
              },
            ],
            practiceTask: {
              ar: "ننسق رسالة فيها اسم ورقم بعد تحويل نوعه.",
              en: "Format a message containing a name and a number after converting its type.",
            },
            learningObjectives: [
              {
                ar: "ننسق رسالة فيها اسم ورقم بعد تحويل نوعه.",
                en: "Format a message containing a name and a number after converting its type.",
              },
            ],
          },
          {
            number: 3,
            title: {
              ar: "إدخال وقرارات",
              en: "Input and Decisions",
            },
            topics: [
              {
                ar: "Booleans وOperators",
                en: "Booleans and operators",
              },
              {
                ar: "User Input وIf...Else",
                en: "User input and If...Else",
              },
            ],
            practiceTask: {
              ar: "نقرأ إجابة المستخدم ونختار رد مناسب بشرط.",
              en: "Read a user’s answer and choose a suitable response with a condition.",
            },
            learningObjectives: [
              {
                ar: "نقرأ إجابة المستخدم ونختار رد مناسب بشرط.",
                en: "Read a user’s answer and choose a suitable response with a condition.",
              },
            ],
          },
          {
            number: 4,
            title: {
              ar: "نجمع بياناتنا",
              en: "Organize Our Data",
            },
            topics: [
              {
                ar: "Lists وTuples",
                en: "Lists and tuples",
              },
              {
                ar: "Sets وDictionaries",
                en: "Sets and dictionaries",
              },
            ],
            practiceTask: {
              ar: "نجرب مجموعات صغيرة ونختار الأنسب لتخزين أسئلة وإجابات.",
              en: "Try small collections and choose a suitable one for storing questions and answers.",
            },
            learningObjectives: [
              {
                ar: "نجرب مجموعات صغيرة ونختار الأنسب لتخزين أسئلة وإجابات.",
                en: "Try small collections and choose a suitable one for storing questions and answers.",
              },
            ],
          },
          {
            number: 5,
            title: {
              ar: "الحلقات والمشروع",
              en: "Loops and the Project",
            },
            topics: [
              {
                ar: "While Loops وFor Loops وRange",
                en: "While loops, for loops and range",
              },
              {
                ar: "تطبيق ومراجعة وتقييم عملي",
                en: "Practice, review and practical assessment",
              },
            ],
            practiceTask: {
              ar: "نبني اختبار أسئلة قصير بشروط وحلقة ونراجع النتيجة.",
              en: "Build a short quiz using conditions and a loop, then review the result.",
            },
            learningObjectives: [
              {
                ar: "نبني اختبار أسئلة قصير بشروط وحلقة ونراجع النتيجة.",
                en: "Build a short quiz using conditions and a loop, then review the result.",
              },
            ],
          },
        ],
        overview: {
          en: "Write your first Python programs using variables, input, collections, conditions and loops, then build a small command-line quiz.",
          ar: "نكتب أول برامج Python باستخدام المتغيرات وإدخال البيانات والمجموعات والشروط والحلقات، وبعدها نبني اختبار أسئلة صغير في سطر الأوامر.",
        },
      },
      {
        ar: "البرمجة الأساسية بـPython",
        en: "Core Python Programming",
        id: "python-level-2",
        slug: "level-2",
        price: 1000,
        oldPrice: 1200,
        hoursPerSession: 2,
        prerequisites: {
          ar: "إكمال المستوى الأول من Python أو معرفة مكافئة بالمتغيرات والشروط والمجموعات والحلقات.",
          en: "Complete Python level 1 or have equivalent knowledge of variables, conditions, collections and loops.",
        },
        project: {
          ar: "تطبيق صغير في سطر الأوامر بيستخدم الدوال والمجموعات ومعالجة الأخطاء، زي آلة حاسبة بقائمة اختيارات.",
          en: "A small command-line application using functions, collections and error handling, such as a menu-driven calculator.",
        },
        outcomes: [
          {
            ar: "يقسم برنامج صغير لدوال بمدخلات وقيم راجعة.",
            en: "Break a small program into functions with inputs and return values.",
          },
          {
            ar: "يستخدم Modules وأمثلة بسيطة على Dates وMath وJSON.",
            en: "Use modules and simple examples involving dates, math and JSON.",
          },
          {
            ar: "يتعرف على أدوات التشغيل ويعالج أخطاء الإدخال بـTry...Except.",
            en: "Explore execution tools and handle input errors with Try...Except.",
          },
        ],
        sessions: [
          {
            number: 1,
            title: {
              ar: "الدوال والاختيارات",
              en: "Functions and Choices",
            },
            topics: [
              {
                ar: "Functions وParameters وReturn Values",
                en: "Functions, parameters and return values",
              },
              {
                ar: "None وMatch",
                en: "None and match",
              },
            ],
            practiceTask: {
              ar: "نكتب دالة حساب بسيطة ونختار العملية باستخدام Match.",
              en: "Write a simple calculation function and choose an operation using match.",
            },
            learningObjectives: [
              {
                ar: "نكتب دالة حساب بسيطة ونختار العملية باستخدام Match.",
                en: "Write a simple calculation function and choose an operation using match.",
              },
            ],
          },
          {
            number: 2,
            title: {
              ar: "ننظم الكود والبيانات",
              en: "Organize Code and Data",
            },
            topics: [
              {
                ar: "Arrays ومقدمة عن Iterators",
                en: "Arrays and an introduction to iterators",
              },
              {
                ar: "Modules",
                en: "Modules",
              },
            ],
            practiceTask: {
              ar: "نجرب Array صغير وIterator جاهز ونستورد Module؛ من غير بناء Iterator مخصص.",
              en: "Try a small array and a ready-made iterator, then import a module without building a custom iterator.",
            },
            learningObjectives: [
              {
                ar: "نجرب Array صغير وIterator جاهز ونستورد Module؛ من غير بناء Iterator مخصص.",
                en: "Try a small array and a ready-made iterator, then import a module without building a custom iterator.",
              },
            ],
          },
          {
            number: 3,
            title: {
              ar: "أدوات جاهزة",
              en: "Ready-Made Tools",
            },
            topics: [
              {
                ar: "Dates وMath",
                en: "Dates and math",
              },
              {
                ar: "JSON",
                en: "JSON",
              },
            ],
            practiceTask: {
              ar: "نجرب تاريخ اليوم وعملية حسابية وتحويل مجموعة صغيرة لـJSON.",
              en: "Try today’s date, a calculation and converting a small collection to JSON.",
            },
            learningObjectives: [
              {
                ar: "نجرب تاريخ اليوم وعملية حسابية وتحويل مجموعة صغيرة لـJSON.",
                en: "Try today’s date, a calculation and converting a small collection to JSON.",
              },
            ],
          },
          {
            number: 4,
            title: {
              ar: "تجهيز ومعالجة أخطاء",
              en: "Setup and Error Handling",
            },
            topics: [
              {
                ar: "مقدمة عن RegEx وPIP",
                en: "Introduction to regular expressions and pip",
              },
              {
                ar: "Try...Except وVirtualEnv",
                en: "Try...Except and virtual environments",
              },
            ],
            practiceTask: {
              ar: "نجرّب نمط نص بسيط ونعالج إدخال غلط، مع تجربة موجهة لـPIP وVirtualEnv.",
              en: "Try a simple text pattern and handle invalid input, with a guided introduction to pip and virtual environments.",
            },
            learningObjectives: [
              {
                ar: "نجرّب نمط نص بسيط ونعالج إدخال غلط، مع تجربة موجهة لـPIP وVirtualEnv.",
                en: "Try a simple text pattern and handle invalid input, with a guided introduction to pip and virtual environments.",
              },
            ],
          },
          {
            number: 5,
            title: {
              ar: "التطبيق النهائي",
              en: "The Final Application",
            },
            topics: [
              {
                ar: "مراجعة وتجميع تطبيق صغير",
                en: "Review and assemble a small application",
              },
              {
                ar: "Debugging وتقييم عملي",
                en: "Debugging and practical assessment",
              },
            ],
            practiceTask: {
              ar: "نجمع دوال ومجموعة بيانات ومعالجة أخطاء في آلة حاسبة بسيطة ونجربها.",
              en: "Combine functions, a data collection and error handling in a simple calculator, then test it.",
            },
            learningObjectives: [
              {
                ar: "نجمع دوال ومجموعة بيانات ومعالجة أخطاء في آلة حاسبة بسيطة ونجربها.",
                en: "Combine functions, a data collection and error handling in a simple calculator, then test it.",
              },
            ],
          },
        ],
        overview: {
          en: "Organize a small application with functions and modules, explore introductory standard tools and handle input errors.",
          ar: "ننظم تطبيق صغير باستخدام الدوال وModules، ونجرب أدوات أساسية جاهزة ونتعامل مع أخطاء الإدخال.",
        },
      },
    ],
    audience: {
      en: "Learners aged around 12 and up who are ready to start writing code, with flexibility according to experience and readiness.",
      ar: "للطلاب من حوالي ١٢ سنة وطالع المستعدين يبدأوا كتابة الكود، مع مرونة حسب الخبرة والاستعداد.",
    },
  },
];
