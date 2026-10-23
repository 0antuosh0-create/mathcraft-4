import { Unit, ErrorDetectiveCase } from '../types/math';

export const UNITS_EN: Unit[] = [
  {
    id: 'unit_1',
    number: 1,
    title: 'Topic 1: Generalize Place Value Understanding',
    description: 'Place value relationships, reading and writing large whole numbers up to 1,000,000, comparing, rounding on a number line, and constructing logical arguments.',
    lessons: [
      {
        id: 'lesson_1_2',
        unitId: 'unit_1',
        number: '1-2',
        title: 'Place Value Relationships',
        subtitle: 'Recognize that in a multi-digit number, a digit in one place represents ten times what it represents in the place to its right.',
        conceptSummary: 'In the base-ten number system, moving one place to the left multiplies the value of a digit by 10. Moving one place to the right divides the value by 10 (one-tenth).',
        detailedExplanation: [
          'Each period (Units, Thousands, Millions) contains three places: ones, tens, and hundreds.',
          'When the same digit appears in adjacent places, the digit on the left is always 10 times greater in value than the digit on the right.',
          'For example, in 7,742: the first 7 is in the thousands place (value: 7,000) and the second 7 is in the hundreds place (value: 700). 7,000 is 10 times 700.'
        ],
        visualDemonstration: {
          type: 'place_value_chart',
          title: 'Comparing the 6s in 675,002 and 385,621',
          data: { kind: 'place_value', number: 675002, highlightedPlace: 'hundred_thousands' }
        },
        rulesAndTips: [
          'To find the place value of a digit, multiply the face value by the place value multiplier (e.g. 6 × 100,000 = 600,000).',
          'Use commas to separate periods of three digits starting from the right.'
        ],
        commonPitfalls: [
          {
            title: 'Confusing Digit Face Value with Place Value',
            mistake: 'A student says the 6 in 675,002 and the 6 in 385,621 have the same value because both are 6.',
            correction: 'The 6 in 675,002 represents 600,000 (hundred thousands), while the 6 in 385,621 represents 600 (hundreds). The first is 1,000 times greater.',
            why: 'Failing to consider the place column in the base-ten system.'
          }
        ],
        questions: [
          {
            id: 'q_1_2_5',
            lessonId: 'lesson_1_2',
            unitId: 'unit_1',
            title: 'Relationship between 6s in 675,002 and 385,621',
            prompt: 'What is the relationship between the 6s in 675,002 and 385,621?',
            category: 'place_value',
            difficulty: 'Intermediate',
            correctAnswer: '1,000 times as great',
            options: ['10 times as great', '100 times as great', '1,000 times as great', '10,000 times as great'],
            explanation: 'In 675,002, the digit 6 is in the hundred thousands place (value: 600,000). In 385,621, the digit 6 is in the hundreds place (value: 600). 600,000 ÷ 600 = 1,000. Therefore, the 6 in 675,002 is 1,000 times as great as the 6 in 385,621.',
            solutionSteps: [
              'Step 1: Find the value of 6 in 675,002 -> 600,000 (hundred thousands place).',
              'Step 2: Find the value of 6 in 385,621 -> 600 (hundreds place).',
              'Step 3: Compare by division: 600,000 ÷ 600 = 1,000 times.'
            ],
            pedagogicalTip: 'Notice there are 3 place-value shifts from hundreds to hundred thousands: 10 × 10 × 10 = 1,000.',
            generatorId: 'gen_place_value_relation'
          },
          {
            id: 'q_1_2_6',
            lessonId: 'lesson_1_2',
            unitId: 'unit_1',
            title: 'Name the value of each 2 in 222,222',
            prompt: 'Name the value of each 2 in 222,222 from left to right.',
            category: 'place_value',
            difficulty: 'Basic',
            correctAnswer: '200,000; 20,000; 2,000; 200; 20; 2',
            explanation: 'From left to right: hundred thousands (200,000), ten thousands (20,000), thousands (2,000), hundreds (200), tens (20), and ones (2).',
            solutionSteps: [
              '2 in hundred thousands place: 200,000',
              '2 in ten thousands place: 20,000',
              '2 in thousands place: 2,000',
              '2 in hundreds place: 200',
              '2 in tens place: 20',
              '2 in ones place: 2'
            ],
            pedagogicalTip: 'Each consecutive 2 is exactly 10 times the value of the 2 to its right.',
            generatorId: 'gen_repeated_digits'
          },
          {
            id: 'q_1_2_lemonade',
            lessonId: 'lesson_1_2',
            unitId: 'unit_1',
            title: 'Lemonade Sold Bar Graph',
            prompt: 'Use the data table: Leah sold 20 cups, Tino sold 10 cups, Kim sold 50 cups, and Neil sold 40 cups. Who sold the most cups? Who sold the fewest? How many cups were sold in all?',
            category: 'arguments',
            difficulty: 'Intermediate',
            contextData: {
              tableTitle: 'Cups of Lemonade Sold',
              headers: ['Child', 'Cups Sold'],
              rows: [
                ['Kim', 50],
                ['Neil', 40],
                ['Leah', 20],
                ['Tino', 10]
              ]
            },
            correctAnswer: 'Kim sold most (50), Tino sold fewest (10); 120 cups in all',
            explanation: 'Comparing values: 50 > 40 > 20 > 10. Kim sold the most (50 cups) and Tino sold the fewest (10 cups). Total sum: 20 + 10 + 50 + 40 = 120 cups.',
            solutionSteps: [
              'Identify highest bar: Kim (50 cups).',
              'Identify lowest bar: Tino (10 cups).',
              'Equation for total cups: 20 + 10 + 50 + 40 = 120 cups.'
            ],
            pedagogicalTip: 'Combine numbers that make easy multiples of 10 first: (20 + 10) = 30; (50 + 40) = 90; 30 + 90 = 120.',
            generatorId: 'gen_table_sum'
          },
          {
            id: 'q_1_2_11',
            lessonId: 'lesson_1_2',
            unitId: 'unit_1',
            title: 'Values of the 5s in 15,573',
            prompt: 'Which of the following shows the values of the 5s in 15,573?',
            category: 'place_value',
            difficulty: 'Basic',
            correctAnswer: '5,000 and 500',
            options: ['500 and 5', '500 and 50', '5,000 and 50', '5,000 and 500'],
            explanation: 'In 15,573, the first 5 is in the thousands place (5,000) and the second 5 is in the hundreds place (500).',
            solutionSteps: [
              '1 in ten thousands = 10,000',
              '5 in thousands = 5,000',
              '5 in hundreds = 500'
            ],
            pedagogicalTip: 'Check digit positions from right to left: ones, tens, hundreds, thousands.',
            generatorId: 'gen_digit_values_choice'
          },
          {
            id: 'q_1_2_12',
            lessonId: 'lesson_1_2',
            unitId: 'unit_1',
            title: 'Value ten times as great as 6 in 162,398',
            prompt: 'In which number is the value of the 6 ten times as great as the value of the 6 in 162,398?',
            category: 'place_value',
            difficulty: 'Challenge',
            correctAnswer: '645,010',
            options: ['465,871', '596,287', '645,010', '754,699'],
            explanation: 'In 162,398, the 6 is in the ten thousands place (value: 60,000). Ten times 60,000 is 600,000 (hundred thousands place). In 645,010, the digit 6 is in the hundred thousands place.',
            solutionSteps: [
              'Value of 6 in 162,398 = 60,000.',
              'Calculate 10 times as great: 60,000 × 10 = 600,000.',
              'Look for the option with 6 in hundred thousands: 645,010.'
            ],
            pedagogicalTip: 'Ten times as great means shifting exactly one place value column to the left.',
            generatorId: 'gen_ten_times_place'
          }
        ]
      },
      {
        id: 'lesson_1_3',
        unitId: 'unit_1',
        number: '1-3',
        title: 'Compare Whole Numbers & Expanded Form',
        subtitle: 'Compare multi-digit numbers based on meanings of digits in each place, using >, =, and < symbols.',
        conceptSummary: 'To compare numbers, first check the number of digits. If they have the same number of digits, compare from the greatest place value (leftmost digit) to the right.',
        detailedExplanation: [
          'A number with more digits is always greater than a number with fewer digits.',
          'If the number of digits is equal, compare the digits in the highest place value. If equal, proceed to the next place value to the right.',
          'Expanded form expresses a number as the sum of the value of each digit: 39,005 = 30,000 + 9,000 + 5.'
        ],
        visualDemonstration: {
          type: 'place_value_chart',
          title: 'Comparing City Populations: 129,788 vs 129,616',
          data: { kind: 'place_value', number: 129788 }
        },
        rulesAndTips: [
          'The comparison symbol points like an arrowhead towards the smaller quantity: 129,788 > 129,616.',
          'In expanded form, zeros represent place holders and do not need to be written as + 0.'
        ],
        commonPitfalls: [
          {
            title: 'Comparing from Right to Left',
            mistake: 'A student compares the ones digits first and thinks 41,032 < 41,023 because 2 < 3.',
            correction: 'Always start comparing from the greatest place value on the left.',
            why: 'Higher place values have vastly more weight than lower place values.'
          }
        ],
        questions: [
          {
            id: 'q_1_3_16',
            lessonId: 'lesson_1_3',
            unitId: 'unit_1',
            title: 'Write 39,005 in expanded form',
            prompt: 'A number written in expanded form is written as the sum of each digit value. Write 39,005 in expanded form.',
            category: 'place_value',
            difficulty: 'Basic',
            correctAnswer: '30,000 + 9,000 + 5',
            explanation: 'The 3 has a value of 30,000; the 9 has a value of 9,000; the 5 has a value of 5. Therefore, 39,005 = 30,000 + 9,000 + 5.',
            solutionSteps: [
              '3 in ten thousands place = 30,000',
              '9 in thousands place = 9,000',
              '0 hundreds and 0 tens',
              '5 in ones place = 5',
              'Expanded sum: 30,000 + 9,000 + 5'
            ],
            pedagogicalTip: 'Check each digit and write its full place value with the appropriate trailing zeros.',
            generatorId: 'gen_expanded_form'
          },
          {
            id: 'q_1_3_17',
            lessonId: 'lesson_1_3',
            unitId: 'unit_1',
            title: 'Ten thousand greater than 563,626',
            prompt: 'According to the census, Wyoming had a population of 563,626. Write the number that is ten thousand greater than 563,626.',
            category: 'addition_multi_digit',
            difficulty: 'Intermediate',
            correctAnswer: '573,626',
            explanation: 'Adding 10,000 changes only the ten thousands place: 6 + 1 = 7. The result is 573,626.',
            solutionSteps: [
              'Locate the ten thousands place: the digit is 6.',
              'Add 1 to the ten thousands digit: 6 + 1 = 7.',
              'Keep all other digits unchanged: 573,626.'
            ],
            pedagogicalTip: 'Mental addition by place value avoids setting up a full vertical algorithm when only one place changes.',
            generatorId: 'gen_add_place_value'
          },
          {
            id: 'q_1_3_18',
            lessonId: 'lesson_1_3',
            unitId: 'unit_1',
            title: 'Comparing sums without adding',
            prompt: 'Celia writes: 8,157 + 364 and 8,157 + 519. She says she can tell which sum will be greater without adding. How does Celia know?',
            category: 'arguments',
            difficulty: 'Intermediate',
            correctAnswer: '8,157 + 519 is greater because 8,157 is common to both and 519 > 364',
            explanation: 'Both expressions share the common addend 8,157. Comparing the other addends: 519 is greater than 364. Therefore, 8,157 + 519 must be greater than 8,157 + 364.',
            solutionSteps: [
              'Identify common addend: 8,157 in both problems.',
              'Compare the second addends: 519 vs 364.',
              'Since 519 > 364, the entire sum 8,157 + 519 > 8,157 + 364.'
            ],
            pedagogicalTip: 'Mathematical reasoning saves calculation time by focusing on what changes between expressions.',
            generatorId: 'gen_compare_without_adding'
          }
        ]
      },
      {
        id: 'lesson_1_4',
        unitId: 'unit_1',
        number: '1-4',
        title: 'Round Whole Numbers',
        subtitle: 'Use place value and number lines to round multi-digit whole numbers to any place.',
        conceptSummary: 'To round a number, identify the rounding place and inspect the digit immediately to its right. If that digit is 5 or greater, round up; if it is less than 5, round down.',
        detailedExplanation: [
          'Locate the rounding place (e.g. nearest thousand, nearest ten thousand).',
          'Inspect the digit directly to the right:',
          '• If 0, 1, 2, 3, or 4: the rounding digit stays the same, and all digits to the right become zeros (round down).',
          '• If 5, 6, 7, 8, or 9: add 1 to the rounding digit, and all digits to the right become zeros (round up).',
          'On a number line, the halfway benchmark determines the direction.'
        ],
        visualDemonstration: {
          type: 'number_line',
          title: 'Rounding 117,821 to the Nearest Thousand',
          data: { kind: 'number_line', min: 117000, max: 118000, target: 117821, step: 100, roundedTo: 118000 }
        },
        rulesAndTips: [
          'Rule of 5: 5 or above gives a shove up; 4 or below lets it go down!',
          'Digits to the left of the rounding place remain unchanged unless a carry occurs (e.g. rounding 999 up).'
        ],
        commonPitfalls: [
          {
            title: 'Altering Digits to the Left',
            mistake: 'When rounding 160,656 to the nearest ten thousand, writing 100,000.',
            correction: 'The 1 in the hundred thousands place is unchanged: 160,000.',
            why: 'Failing to keep higher place values intact.'
          }
        ],
        questions: [
          {
            id: 'q_1_4_1',
            lessonId: 'lesson_1_4',
            unitId: 'unit_1',
            title: 'Round 160,656 to the nearest ten thousand',
            prompt: 'Round 160,656 to the place of the underlined digit: 160,656 (underlined digit: 6 in ten thousands place).',
            category: 'rounding',
            difficulty: 'Intermediate',
            correctAnswer: '160,000',
            visualModel: {
              type: 'number_line',
              title: 'Number line 160,000 to 170,000',
              data: { kind: 'number_line', min: 160000, max: 170000, target: 160656, step: 1000, roundedTo: 160000 }
            },
            explanation: 'The rounding place is ten thousands (digit 6). The digit to its right in the thousands place is 0. Since 0 < 5, round down to 160,000.',
            solutionSteps: [
              'Rounding place: ten thousands (6).',
              'Next digit to the right: 0 (thousands place).',
              '0 is less than 5 -> round down: 160,000.'
            ],
            pedagogicalTip: '160,656 is much closer to 160,000 than to 170,000.',
            generatorId: 'gen_rounding_ten_thousands'
          },
          {
            id: 'q_1_4_3',
            lessonId: 'lesson_1_4',
            unitId: 'unit_1',
            title: 'Round 117,821 to the nearest thousand',
            prompt: 'Round 117,821 to the place of the underlined digit: 117,821 (underlined digit: 7 in thousands place).',
            category: 'rounding',
            difficulty: 'Basic',
            correctAnswer: '118,000',
            visualModel: {
              type: 'number_line',
              title: 'Number line 117,000 to 118,000',
              data: { kind: 'number_line', min: 117000, max: 118000, target: 117821, step: 100, roundedTo: 118000 }
            },
            explanation: 'The rounding place is thousands (digit 7). The digit to the right is 8 in the hundreds place. Since 8 ≥ 5, round up: 7 becomes 8, yielding 118,000.',
            solutionSteps: [
              'Rounding place: thousands (7).',
              'Next digit to the right: 8 (hundreds place).',
              '8 is 5 or greater -> round up: 118,000.'
            ],
            pedagogicalTip: 'Halfway benchmark between 117,000 and 118,000 is 117,500. 117,821 is past the halfway mark.',
            generatorId: 'gen_rounding_thousands'
          },
          {
            id: 'q_1_4_6',
            lessonId: 'lesson_1_4',
            unitId: 'unit_1',
            title: 'Round 900,985 to the nearest hundred thousand',
            prompt: 'Round 900,985 to the place of the underlined digit: 900,985 (underlined digit: 9 in hundred thousands place).',
            category: 'rounding',
            difficulty: 'Intermediate',
            correctAnswer: '900,000',
            explanation: 'The rounding place is hundred thousands (digit 9). The next digit to the right is 0 in the ten thousands place. Since 0 < 5, round down to 900,000.',
            solutionSteps: [
              'Rounding place: hundred thousands (9).',
              'Next digit to the right: 0 in ten thousands place.',
              '0 < 5 -> round down: 900,000.'
            ],
            pedagogicalTip: 'Even though 985 appears at the end, the very next digit after hundred thousands is 0, which governs rounding.',
            generatorId: 'gen_rounding_hundred_thousands'
          }
        ]
      },
      {
        id: 'lesson_1_5',
        unitId: 'unit_1',
        number: '1-5',
        title: 'Construct Arguments & Performance Task',
        subtitle: 'Use place value reasoning and estimation to justify conjectures and solve real-world problems.',
        conceptSummary: 'Constructing arguments involves using clear mathematical evidence (place value rules, benchmarks, rounding) to prove why a claim is true or false.',
        detailedExplanation: [
          'Kyle said Colorado (23,301 building permits) issued about 100 times as many permits as Vermont (2,296). To test this, round both numbers: 23,301 ≈ 20,000 and 2,296 ≈ 2,000. 20,000 ÷ 2,000 = 10, not 100!',
          'Alisa compared Set A (45,760 and 1,025,680) and Set B (492,111 and 409,867). Comparing Set A is easier because one number has 5 digits and the other has 7 digits.',
          'Flight Distances Task: Lee conjectured that Chicago to Istanbul (5,784 mi) is the same as Chicago to Sao Paulo (5,252 mi) when rounded to the nearest thousand. 5,784 rounds to 6,000 and 5,252 rounds to 5,000, so the claim is false.'
        ],
        visualDemonstration: {
          type: 'tape_diagram',
          title: 'Flight Distances from Chicago O\'Hare',
          data: {
            kind: 'tape_diagram',
            totalLabel: 'Flight Routes from Chicago',
            parts: [
              { label: 'Chicago to Istanbul', value: 5784 },
              { label: 'Chicago to Sao Paulo', value: 5252 }
            ]
          }
        },
        rulesAndTips: [
          'To disprove a multiplier claim, multiply the smaller quantity by the claimed factor and verify reasonableness.',
          'A factor of 100 adds two zeros, whereas a factor of 10 adds only one zero.'
        ],
        commonPitfalls: [
          {
            title: 'Miscounting Zeros in Multipliers',
            mistake: 'Believing 20,000 ÷ 2,000 is 100.',
            correction: 'Cancel three zeros from each number: 20 ÷ 2 = 10.',
            why: 'Overlooking zero cancellation during mental division of multiples of ten.'
          }
        ],
        questions: [
          {
            id: 'q_1_5_kyle',
            lessonId: 'lesson_1_5',
            unitId: 'unit_1',
            title: 'Evaluate Kyle\'s building permits conjecture',
            prompt: 'In a recent year, Colorado issued 23,301 building permits and Vermont issued 2,296 building permits. Kyle said Colorado issued about 100 times as many permits as Vermont. Is Kyle\'s conjecture true? Justify your answer using estimation.',
            category: 'arguments',
            difficulty: 'Intermediate',
            correctAnswer: 'Kyle\'s conjecture is false; Colorado issued about 10 times as many permits (not 100 times).',
            explanation: 'Rounding to the nearest thousand: Colorado issued about 20,000 permits and Vermont issued about 2,000 permits. 2,000 × 10 = 20,000, so Colorado issued about 10 times as many. 100 times 2,000 would be 200,000 permits.',
            solutionSteps: [
              'Round Colorado permits: 23,301 ≈ 20,000.',
              'Round Vermont permits: 2,296 ≈ 2,000.',
              'Check ratio: 20,000 ÷ 2,000 = 10.',
              'Check Kyle\'s claim: 2,000 × 100 = 200,000 (much larger than 23,301).',
              'Conclusion: Kyle is incorrect.'
            ],
            pedagogicalTip: 'Multiplication by 100 represents two place-value shifts, not one.',
            generatorId: 'gen_argument_ratio'
          },
          {
            id: 'q_1_5_flights',
            lessonId: 'lesson_1_5',
            unitId: 'unit_1',
            title: 'Performance Task: Flight Distances Conjecture',
            prompt: 'The flight distance from Chicago to Istanbul is 5,784 miles, and to Sao Paulo is 5,252 miles. Lee conjectured that the flight distance to Istanbul is the same as to Sao Paulo when both are rounded to the nearest thousand. Is Lee\'s conjecture true? Explain.',
            category: 'arguments',
            difficulty: 'Intermediate',
            contextData: {
              tableTitle: 'Flight Distances from Chicago O\'Hare',
              headers: ['Destination', 'Distance (miles)'],
              rows: [
                ['Istanbul, Turkey', '5,784 miles'],
                ['Sao Paulo, Brazil', '5,252 miles'],
                ['Beijing, China', '6,579 miles']
              ]
            },
            correctAnswer: 'Lee\'s conjecture is false; Istanbul rounds to 6,000 miles and Sao Paulo rounds to 5,000 miles.',
            explanation: 'In 5,784, the hundreds digit is 7 (≥ 5), so it rounds up to 6,000 miles. In 5,252, the hundreds digit is 2 (< 5), so it rounds down to 5,000 miles. Since 6,000 ≠ 5,000, Lee\'s conjecture is false.',
            solutionSteps: [
              'Round distance to Istanbul: 5,784 rounds to 6,000 miles.',
              'Round distance to Sao Paulo: 5,252 rounds to 5,000 miles.',
              'Compare rounded values: 6,000 miles ≠ 5,000 miles.',
              'Conclusion: Conjectured equality is false.'
            ],
            pedagogicalTip: 'Always write out the rounded value for each entity explicitly before comparing.'
            ,generatorId: 'gen_flights_conjecture'
          }
        ]
      }
    ]
  },
  {
    id: 'unit_2',
    number: 2,
    title: 'Topic 2: Fluently Add & Subtract Multi-Digit Whole Numbers',
    description: 'Mental math strategies (compensation, make ten), estimation, standard addition and subtraction algorithms, subtracting across zeros, and two-step tape diagram modeling.',
    lessons: [
      {
        id: 'lesson_2_1',
        unitId: 'unit_2',
        number: '2-1',
        title: 'Mental Math Strategies for Sums & Differences',
        subtitle: 'Use properties of operations (Associative, Commutative) and compensation to compute sums and differences mentally.',
        conceptSummary: 'Mental math strategies break numbers into friendly chunks. In addition compensation, adding to one addend requires subtracting the same amount from the other. In subtraction compensation, adding/subtracting the same amount to both numbers preserves the constant difference.',
        detailedExplanation: [
          'Make Ten / Friendly Numbers: For 3,928 + 2,480, rewrite 3,928 as 3,408 + 520. Then (520 + 2,480) = 3,000, and 3,408 + 3,000 = 6,408.',
          'Addition Compensation: (3,928 + 72) + (2,480 - 72) = 4,000 + 2,408 = 6,408.',
          'Subtraction Compensation: (9,125 + 15) - (7,985 + 15) = 9,140 - 8,000 = 1,140. Both numbers must increase by 15 so that the distance between them remains invariant.',
          'Count Up: Start at 7,985: +15 -> 8,000; +125 -> 8,125; +1,000 -> 9,125. Total added: 15 + 125 + 1,000 = 1,140.'
        ],
        visualDemonstration: {
          type: 'tape_diagram',
          title: 'Constant Difference in Subtraction Compensation',
          data: {
            kind: 'tape_diagram',
            totalLabel: 'Distance between 9,140 and 8,000 is 1,140',
            parts: [
              { label: 'Subtrahend benchmark', value: 8000 },
              { label: 'Difference', value: 1140 }
            ]
          }
        },
        rulesAndTips: [
          'Addition compensation rule: Add to one, subtract from the other (+ and -).',
          'Subtraction compensation rule: Add to both, or subtract from both (+ and +, or - and -).',
          'In count-up subtraction, jump to the nearest hundred or thousand first.'
        ],
        commonPitfalls: [
          {
            title: 'Guy\'s Mistake: Applying Addition Compensation to Subtraction',
            mistake: 'Guy computed 8,265 - 7,145 as (8,265 - 55) - (7,145 + 55) = 8,210 - 7,200 = 1,010.',
            correction: 'In subtraction, add 55 to BOTH numbers: (8,265 + 55) - (7,145 + 55) = 8,320 - 7,200 = 1,120.',
            why: 'Guy subtracted from one and added to the other, which shrank the true difference by 110.'
          }
        ],
        questions: [
          {
            id: 'q_2_1_compensation_add',
            lessonId: 'lesson_2_1',
            unitId: 'unit_2',
            title: 'Use compensation to find 3,928 + 2,480 mentally',
            prompt: 'Use mental math compensation to find the sum: 3,928 + 2,480.',
            category: 'mental_math',
            difficulty: 'Intermediate',
            correctAnswer: '6,408',
            explanation: 'Add 72 to 3,928 to make 4,000, and subtract 72 from 2,480 to get 2,408. Then: 4,000 + 2,408 = 6,408.',
            solutionSteps: [
              'Notice 3,928 is 72 away from 4,000.',
              'Compensate: (3,928 + 72) + (2,480 - 72).',
              '4,000 + 2,408 = 6,408.'
            ],
            pedagogicalTip: 'Choose the addend that is closest to a round thousand to minimize arithmetic.',
            generatorId: 'gen_mental_add_comp'
          },
          {
            id: 'q_2_1_compensation_sub',
            lessonId: 'lesson_2_1',
            unitId: 'unit_2',
            title: 'Use compensation to find 9,125 - 7,985 mentally',
            prompt: 'Use mental math compensation to find the difference: 9,125 - 7,985.',
            category: 'mental_math',
            difficulty: 'Intermediate',
            correctAnswer: '1,140',
            explanation: 'Add 15 to both numbers so 7,985 becomes an easy 8,000: (9,125 + 15) - (7,985 + 15) = 9,140 - 8,000 = 1,140.',
            solutionSteps: [
              'The subtrahend 7,985 is 15 away from 8,000.',
              'Add 15 to BOTH numbers: (9,125 + 15) - (7,985 + 15).',
              'Calculate: 9,140 - 8,000 = 1,140.'
            ],
            pedagogicalTip: 'Remember that shifting both points along a number line by the same amount preserves distance.',
            generatorId: 'gen_mental_sub_comp'
          },
          {
            id: 'q_2_1_planets',
            lessonId: 'lesson_2_1',
            unitId: 'unit_2',
            title: 'Speed of planets Venus and Mars',
            prompt: 'The orbital speed of Venus is 78,341 miles per hour and Mars is 53,979 miles per hour. What is the difference between their speeds? Explain how to use mental math.',
            category: 'mental_math',
            difficulty: 'Challenge',
            contextData: {
              tableTitle: 'Speeds of Planets (miles per hour)',
              headers: ['Planet', 'Speed (mph)'],
              rows: [
                ['Venus', '78,341'],
                ['Mars', '53,979'],
                ['Saturn', '21,637'],
                ['Neptune', '12,253']
              ]
            },
            correctAnswer: '24,362 miles per hour',
            explanation: 'Add 21 to both numbers: 53,979 + 21 = 54,000; 78,341 + 21 = 78,362. Then subtract mentally: 78,362 - 54,000 = 24,362 mph.',
            solutionSteps: [
              'Target benchmark for Mars: 53,979 + 21 = 54,000.',
              'Add 21 to Venus: 78,341 + 21 = 78,362.',
              'Subtract: 78,362 - 54,000 = 24,362 mph.'
            ],
            pedagogicalTip: 'Mental compensation turns a 5-digit subtraction with three borrowings into a simple one-step difference.',
            generatorId: 'gen_planets_diff'
          },
          {
            id: 'q_2_1_saturn_name',
            lessonId: 'lesson_2_1',
            unitId: 'unit_2',
            title: 'Write Saturn\'s speed using number names',
            prompt: 'The speed of the planet Saturn is 21,637 miles per hour. Write this speed using number names (word form).',
            category: 'place_value',
            difficulty: 'Basic',
            correctAnswer: 'twenty-one thousand, six hundred thirty-seven',
            explanation: '21 in the thousands period is "twenty-one thousand"; 637 in the units period is "six hundred thirty-seven".',
            solutionSteps: [
              'Thousands period: 21 -> twenty-one thousand.',
              'Units period: 637 -> six hundred thirty-seven.',
              'Combined: twenty-one thousand, six hundred thirty-seven.'
            ],
            pedagogicalTip: 'Use a comma to separate the thousands period from the units period, matching the digit representation.',
            generatorId: 'gen_number_words'
          }
        ]
      },
      {
        id: 'lesson_2_2',
        unitId: 'unit_2',
        number: '2-2',
        title: 'Estimating Sums and Differences',
        subtitle: 'Round numbers to different place values to estimate sums and differences and assess reasonableness.',
        conceptSummary: 'Estimation allows us to predict answers before computing or check whether an exact answer is reasonable. Rounding to higher place values provides faster estimates, while lower place values give closer approximations.',
        detailedExplanation: [
          'Different rounding places produce different estimates, but both can be valid depending on the context.',
          'For example, to estimate 64,236 + 15,542: rounding to hundreds gives 64,200 + 15,500 = 79,700; rounding to thousands gives 64,000 + 16,000 = 80,000; rounding to ten thousands gives 60,000 + 20,000 = 80,000.',
          'In multi-step problems (e.g. movie ticket sales across three periods), estimate the sub-totals first before subtracting.'
        ],
        visualDemonstration: {
          type: 'tape_diagram',
          title: 'Estimated Ocean Area Comparison',
          data: {
            kind: 'tape_diagram',
            totalLabel: 'Pacific Ocean (165,760 ≈ 166,000 sq km)',
            parts: [
              { label: 'Arctic Ocean (14,090 ≈ 14,000)', value: 14000 },
              { label: 'Estimated Difference', value: 152000, isUnknown: true }
            ]
          }
        },
        rulesAndTips: [
          'For rapid estimates, round both numbers to the leading place value of the smaller number.',
          'If an exact answer diverges drastically from your estimate, immediately re-check your calculations.'
        ],
        commonPitfalls: [
          {
            title: 'Inconsistent Rounding Places',
            mistake: 'Rounding one addend to the nearest ten and the other to the nearest hundred thousand.',
            correction: 'Maintain a consistent benchmark place value across all terms in an expression.',
            why: 'Mixing disparate scales distorts the estimate.'
          }
        ],
        questions: [
          {
            id: 'q_2_2_oceans',
            lessonId: 'lesson_2_2',
            unitId: 'unit_2',
            title: 'Estimate ocean area difference',
            prompt: 'Use the data table: Pacific (165,760 sq km), Atlantic (82,400 sq km), Indian (65,527 sq km), and Arctic (14,090 sq km). About how much greater is the area of the largest ocean than the area of the smallest ocean?',
            category: 'estimation',
            difficulty: 'Intermediate',
            contextData: {
              tableTitle: 'Ocean Areas (thousands of sq km)',
              headers: ['Ocean', 'Area'],
              rows: [
                ['Pacific Ocean', '165,760'],
                ['Atlantic Ocean', '82,400'],
                ['Indian Ocean', '65,527'],
                ['Arctic Ocean', '14,090']
              ]
            },
            correctAnswer: 'About 152,000 sq km (or 150,000 sq km)',
            explanation: 'Largest ocean is Pacific (165,760 ≈ 166,000). Smallest is Arctic (14,090 ≈ 14,000). Difference: 166,000 - 14,000 = 152,000 sq km (or rounding to ten thousands: 170,000 - 10,000 = 160,000).',
            solutionSteps: [
              'Identify largest: Pacific (165,760).',
              'Identify smallest: Arctic (14,090).',
              'Round to nearest thousand: 166,000 and 14,000.',
              'Subtract: 166,000 - 14,000 = 152,000 sq km.'
            ],
            pedagogicalTip: 'Inspect the table carefully to ensure you select the extreme values (max and min).',
            generatorId: 'gen_oceans_estimate'
          },
          {
            id: 'q_2_2_movie',
            lessonId: 'lesson_2_2',
            unitId: 'unit_2',
            title: 'Movie ticket sales comparison estimate',
            prompt: 'In one weekend, a theater sells 74,877 tickets. They sell 21,243 tickets the following week and 39,643 tickets the following weekend. About how many more tickets do they sell the first weekend than the following week and weekend combined?',
            category: 'estimation',
            difficulty: 'Challenge',
            correctAnswer: 'About 14,000 to 15,000 tickets',
            explanation: 'Following week and weekend combined: 21,243 + 39,643 ≈ 21,000 + 40,000 = 61,000 tickets. First weekend: 74,877 ≈ 75,000 tickets. Difference: 75,000 - 61,000 = 14,000 tickets.',
            solutionSteps: [
              'Round week sales: 21,243 ≈ 21,000.',
              'Round next weekend: 39,643 ≈ 40,000.',
              'Sum of second period: 21,000 + 40,000 = 61,000.',
              'Round first weekend: 74,877 ≈ 75,000.',
              'Subtract: 75,000 - 61,000 = 14,000 tickets.'
            ],
            pedagogicalTip: 'This is a two-step estimation problem: sum the parts of the second group before finding the difference.',
            generatorId: 'gen_multi_step_estimate'
          }
        ]
      },
      {
        id: 'lesson_2_3',
        unitId: 'unit_2',
        number: '2-3',
        title: 'Add Whole Numbers',
        subtitle: 'Fluently add multi-digit numbers using the standard vertical algorithm with regrouping.',
        conceptSummary: 'Add starting from the ones place. When the sum of any column is 10 or greater, regroup (carry) the tens digit to the top of the next column to the left.',
        detailedExplanation: [
          'Step 1: Add ones. Regroup if 10 or more (e.g. 12 ones = 1 ten + 2 ones).',
          'Step 2: Add tens including any carried ten. Regroup if necessary.',
          'Step 3: Add hundreds, thousands, and so on.',
          'Always estimate the sum first to ensure the calculated answer is reasonable.'
        ],
        visualDemonstration: {
          type: 'vertical_addition',
          title: 'Vertical Addition with Two Regroupings: 873 + 465',
          data: {
            kind: 'vertical_op',
            op: '+',
            num1: 873,
            num2: 465,
            steps: [
              'Ones: 3 + 5 = 8 (no regrouping)',
              'Tens: 7 + 6 = 13 -> write 3, carry 1 to hundreds',
              'Hundreds: 1 + 8 + 4 = 13 -> write 3, carry 1 to thousands',
              'Total Sum = 1,338'
            ]
          }
        },
        rulesAndTips: [
          'Record carried digits clearly at the top of the correct column.',
          'Keep columns strictly aligned vertically.'
        ],
        commonPitfalls: [
          {
            title: 'Forgetting Carried Digits',
            mistake: 'Computing 7 + 6 = 13 in the tens column, but failing to add the carried 1 when computing hundreds.',
            correction: 'Always add the carried 1 first: 1 + 8 + 4 = 13.',
            why: 'Working too quickly without writing down the regrouped digit.'
          }
        ],
        questions: [
          {
            id: 'q_2_3_regroup_count',
            lessonId: 'lesson_2_3',
            unitId: 'unit_2',
            title: 'How many times do you regroup in 873 + 465?',
            prompt: 'How many times do you need to regroup to add 873 + 465? Explain.',
            category: 'addition_multi_digit',
            difficulty: 'Intermediate',
            correctAnswer: '2 times',
            visualModel: {
              type: 'vertical_addition',
              title: '873 + 465',
              data: { kind: 'vertical_op', op: '+', num1: 873, num2: 465 }
            },
            explanation: 'Ones column: 3 + 5 = 8 (no regroup). Tens column: 7 + 6 = 13 (regroup once to hundreds). Hundreds column: 1 + 8 + 4 = 13 (regroup once to thousands). Total regroupings = 2 times.',
            solutionSteps: [
              'Ones: 3 + 5 = 8 (< 10, no regroup).',
              'Tens: 7 + 6 = 13 (≥ 10, 1 regroup to hundreds).',
              'Hundreds: 1 + 8 + 4 = 13 (≥ 10, 1 regroup to thousands).',
              'Total regroupings: 2 times.'
            ],
            pedagogicalTip: 'Every column whose sum reaches 10 or greater triggers exactly one regrouping.',
            generatorId: 'gen_regroup_count'
          },
          {
            id: 'q_2_3_missing_addend',
            lessonId: 'lesson_2_3',
            unitId: 'unit_2',
            title: 'Find the missing addend: 556 + ? = 1,046',
            prompt: 'Which is the missing addend in 556 + □ = 1,046?',
            category: 'addition_multi_digit',
            difficulty: 'Intermediate',
            correctAnswer: '490',
            options: ['510', '480', '490', '523'],
            explanation: 'To find the missing addend, subtract the known addend from the sum: 1,046 - 556 = 490.',
            solutionSteps: [
              'Inverse operation: □ = 1,046 - 556.',
              'Ones: 6 - 6 = 0.',
              'Tens: 4 < 5 -> regroup from hundreds: 14 - 5 = 9.',
              'Hundreds: 9 - 5 = 4.',
              'Answer = 490.'
            ],
            pedagogicalTip: 'Subtraction is the inverse operation of addition.',
            generatorId: 'gen_missing_addend'
          }
        ]
      },
      {
        id: 'lesson_2_4',
        unitId: 'unit_2',
        number: '2-4',
        title: 'Add Greater Numbers',
        subtitle: 'Add whole numbers with up to 6 digits, including sums with multiple addends.',
        conceptSummary: 'Adding 5-digit and 6-digit numbers follows the exact same place-value procedure. When adding three or more numbers, carried digits can be 2 or greater.',
        detailedExplanation: [
          'For 629,979 + 294,116 + 75,905: ones column sums to 9 + 6 + 5 = 20. Write 0 and carry 2.',
          'Align all addends carefully along the right margin (ones column).',
          'Interstate highway lengths and multi-item postal deliveries are realistic contexts for multi-digit additions.'
        ],
        visualDemonstration: {
          type: 'vertical_addition',
          title: 'Adding 3 Large Numbers with 2-digit Regrouping',
          data: {
            kind: 'vertical_op',
            op: '+',
            num1: 629979,
            num2: 294116,
            num3: 75905,
            steps: [
              'Ones: 9 + 6 + 5 = 20 -> write 0, carry 2',
              'Tens: 2 + 7 + 1 + 0 = 10 -> write 0, carry 1',
              'Hundreds: 1 + 9 + 1 + 9 = 20 -> write 0, carry 2',
              'Thousands: 2 + 9 + 4 + 5 = 20 -> write 0, carry 2',
              'Ten Thousands: 2 + 2 + 9 + 7 = 20 -> write 0, carry 2',
              'Hundred Thousands: 2 + 6 + 2 = 10 -> write 10',
              'Exact Sum: 1,000,000 (one million)'
            ]
          }
        },
        rulesAndTips: [
          'When adding 3 or more numbers, remember the carried digit can be greater than 1.',
          'Always add columns top to bottom or pair numbers that sum to 10 first.'
        ],
        commonPitfalls: [
          {
            title: 'Misalignment of Addends with Unequal Digits',
            mistake: 'Aligning 75,905 on the left with 6-digit numbers.',
            correction: 'Always align numbers by their ones digit on the right.',
            why: 'Aligning on the left adds tens of thousands to hundreds of thousands.'
          }
        ],
        questions: [
          {
            id: 'q_2_4_highways',
            lessonId: 'lesson_2_4',
            unitId: 'unit_2',
            title: 'Combined length of interstate highways',
            prompt: 'The table shows the lengths of four highways: I-90 is 3,102 miles, I-10 is 2,460 miles, I-70 is 2,153 miles, and I-80 is 2,899 miles. What is the combined length of the four highways?',
            category: 'addition_multi_digit',
            difficulty: 'Challenge',
            contextData: {
              tableTitle: 'Lengths of Interstate Highways',
              headers: ['Interstate', 'Length (miles)'],
              rows: [
                ['I-90', '3,102'],
                ['I-10', '2,460'],
                ['I-70', '2,153'],
                ['I-80', '2,899']
              ]
            },
            correctAnswer: '10,614 miles',
            explanation: 'Summing all four lengths: 3,102 + 2,460 + 2,153 + 2,899 = 10,614 miles.',
            solutionSteps: [
              'Sum first two: 3,102 + 2,460 = 5,562 miles.',
              'Sum second two: 2,153 + 2,899 = 5,052 miles.',
              'Add subtotals: 5,562 + 5,052 = 10,614 miles.'
            ],
            pedagogicalTip: 'Adding in pairs reduces mental fatigue and error probability.',
            generatorId: 'gen_four_addends'
          },
          {
            id: 'q_2_4_mail',
            lessonId: 'lesson_2_4',
            unitId: 'unit_2',
            title: 'Shipping company total items',
            prompt: 'A shipping company delivered 38,728 letters and 41,584 packages. How many total items did the company deliver?',
            category: 'addition_multi_digit',
            difficulty: 'Intermediate',
            correctAnswer: '80,312 items',
            explanation: '38,728 + 41,584 = 80,312. (A student on the worksheet wrote 79,862 due to missing a regrouping carry; the corrected answer is 80,312).',
            solutionSteps: [
              'Ones: 8 + 4 = 12 -> write 2, carry 1.',
              'Tens: 2 + 8 + 1 = 11 -> write 1, carry 1.',
              'Hundreds: 7 + 5 + 1 = 13 -> write 3, carry 1.',
              'Thousands: 8 + 1 + 1 = 10 -> write 0, carry 1.',
              'Ten Thousands: 3 + 4 + 1 = 8.',
              'Total = 80,312 items.'
            ],
            pedagogicalTip: 'Notice every single place column in this problem requires a carry!',
            generatorId: 'gen_six_digit_add'
          }
        ]
      },
      {
        id: 'lesson_2_5',
        unitId: 'unit_2',
        number: '2-5',
        title: 'Subtract Whole Numbers with Regrouping',
        subtitle: 'Subtract multi-digit numbers with regrouping across tens and hundreds.',
        conceptSummary: 'When the top digit in a column is smaller than the bottom digit, regroup 1 unit from the place to the left, which yields 10 units in the current place.',
        detailedExplanation: [
          'In 851 - 374: in ones column, 1 < 4. Regroup 1 ten from 5 tens -> 5 tens become 4 tens, and 1 becomes 11 ones. 11 - 4 = 7.',
          'In tens column, 4 < 7. Regroup 1 hundred from 8 hundreds -> 8 becomes 7, and 4 becomes 14 tens. 14 - 7 = 7.',
          'In hundreds column: 7 - 3 = 4. Final answer: 477.',
          'In 537 - 443, after regrouping 1 hundred to tens (giving 13 - 4 = 9), the hundreds column becomes 4 - 4 = 0, which is why there is no digit in the hundreds place in the answer (94).'
        ],
        visualDemonstration: {
          type: 'vertical_subtraction',
          title: 'Vertical Subtraction with Regrouping: 851 - 374',
          data: {
            kind: 'vertical_op',
            op: '-',
            num1: 851,
            num2: 374,
            steps: [
              'Ones: Regroup 5 tens to 4 tens, 1 ones becomes 11 ones -> 11 - 4 = 7',
              'Tens: Regroup 8 hundreds to 7 hundreds, 4 tens becomes 14 tens -> 14 - 7 = 7',
              'Hundreds: 7 - 3 = 4',
              'Difference: 477'
            ]
          }
        },
        rulesAndTips: [
          'Always cross out and decrease the lending place before writing the new digit.',
          'Check your subtraction by adding the answer to the subtrahend (bottom number).'
        ],
        commonPitfalls: [
          {
            title: 'Subtrahend Reversal (Top/Bottom Flip)',
            mistake: 'In 851 - 374, in the ones column (1 - 4), computing 4 - 1 = 3.',
            correction: 'Subtraction is not commutative. You must borrow from the tens place: 11 - 4 = 7.',
            why: 'Trying to avoid borrowing by subtracting the smaller digit from the larger digit regardless of position.'
          }
        ],
        questions: [
          {
            id: 'q_2_5_lobsters',
            lessonId: 'lesson_2_5',
            unitId: 'unit_2',
            title: 'Florida Spiny Lobster Harvest Comparison',
            prompt: 'A boat harvested lobsters: Day 1 (176), Day 2 (215), Day 3 (96), and Day 4 (117). How many more lobsters did the boat harvest on days 1 and 4 combined than on day 2?',
            category: 'subtraction_regroup',
            difficulty: 'Intermediate',
            contextData: {
              tableTitle: 'Spiny Lobsters Harvested',
              headers: ['Day', 'Number of Lobsters'],
              rows: [
                ['Day 1', '176'],
                ['Day 2', '215'],
                ['Day 3', '96'],
                ['Day 4', '117']
              ]
            },
            correctAnswer: '78 more lobsters',
            explanation: 'Combine Days 1 and 4: 176 + 117 = 293 lobsters. Subtract Day 2 harvest: 293 - 215 = 78 lobsters.',
            solutionSteps: [
              'Step 1: Sum days 1 and 4 -> 176 + 117 = 293.',
              'Step 2: Subtract day 2 -> 293 - 215.',
              'Ones: 3 < 5 -> borrow from tens: 13 - 5 = 8.',
              'Tens: 8 - 1 = 7.',
              'Hundreds: 2 - 2 = 0.',
              'Result = 78 lobsters.'
            ],
            pedagogicalTip: 'Day 3 is distractor data not needed for answering the question.',
            generatorId: 'gen_lobster_sub'
          },
          {
            id: 'q_2_5_missing_digit',
            lessonId: 'lesson_2_5',
            unitId: 'unit_2',
            title: 'Find the missing digit in subtraction',
            prompt: 'What is the missing digit in the subtraction statement: 5 □ 6 - 387 = 139?',
            category: 'subtraction_regroup',
            difficulty: 'Challenge',
            correctAnswer: '2',
            options: ['5', '7', '2', '9'],
            explanation: 'Using the inverse operation of addition: 139 + 387 = 526. Therefore, the minuend is 526, and the missing tens digit is 2.',
            solutionSteps: [
              'Add difference to subtrahend: 139 + 387.',
              '9 + 7 = 16 (ones digit 6, carry 1).',
              '3 + 8 + 1 = 12 (tens digit 2, carry 1).',
              '1 + 3 + 1 = 5 (hundreds digit 5).',
              'Minuend is 526 -> missing digit is 2.'
            ],
            pedagogicalTip: 'Adding from the bottom up is the fastest and most foolproof way to find missing digits.',
            generatorId: 'gen_missing_digit_sub'
          }
        ]
      },
      {
        id: 'lesson_2_6',
        unitId: 'unit_2',
        number: '2-6',
        title: 'Subtract Greater Numbers & Critique Reasoning',
        subtitle: 'Solve multi-step subtraction problems and critique flawed mathematical arguments.',
        conceptSummary: 'Multi-step real-world problems require aggregating given quantities first, then subtracting from the overall goal.',
        detailedExplanation: [
          'Environmental Club Cans Goal: Goal is 9,525 cans. June (1,898) + July (2,643) + August (2,287) = 6,828 cans. Needed in September: 9,525 - 6,828 = 2,697 cans.',
          'Critique Mitch\'s Reasoning: Mitch wrote 657,392 - 434,597 = 222,895. Mitch made an error in the hundreds place: the 3 was reduced to 2 by borrowing, so 12 - 5 = 7, but Mitch wrote 8. Correct answer: 222,795.',
          'Naima\'s Pedometer: Goal is 88,942 steps, walked 43,498 steps. 88,942 - 43,498 = 45,444 steps.'
        ],
        visualDemonstration: {
          type: 'tape_diagram',
          title: 'Environmental Club Can Collection Goal (9,525 Cans)',
          data: {
            kind: 'tape_diagram',
            totalLabel: 'Total Goal: 9,525 cans',
            parts: [
              { label: 'June + July + August (6,828)', value: 6828 },
              { label: 'September Needed', value: 2697, isUnknown: true }
            ]
          }
        },
        rulesAndTips: [
          'In multi-step subtraction, clearly state the intermediate total before executing the final subtraction.',
          'When auditing someone else\'s work, calculate the problem yourself independently first.'
        ],
        commonPitfalls: [
          {
            title: 'Naima\'s Borrowing Reduction Error',
            mistake: 'Computing 88,942 - 43,498 as 52,444 because the ten thousands digit 8 was not reduced after borrowing.',
            correction: 'The ten thousands digit becomes 7 after lending to thousands; 7 - 4 = 3 (with previous carries resulting in 45,444).',
            why: 'Neglecting to record the diminished value of higher place values.'
          }
        ],
        questions: [
          {
            id: 'q_2_6_cans',
            lessonId: 'lesson_2_6',
            unitId: 'unit_2',
            title: 'Environmental club can collection goal',
            prompt: 'The Environmental Club\'s goal is to collect 9,525 cans by the end of four months. In June they collected 1,898 cans, in July 2,643 cans, and in August 2,287 cans. How many more cans do they need to collect in September to meet their goal?',
            category: 'subtraction_regroup',
            difficulty: 'Challenge',
            correctAnswer: '2,697 cans',
            explanation: 'Total collected in first three months: 1,898 + 2,643 + 2,287 = 6,828 cans. Subtract from goal: 9,525 - 6,828 = 2,697 cans needed in September.',
            solutionSteps: [
              'Step 1: Sum first 3 months -> 1,898 + 2,643 + 2,287 = 6,828 cans.',
              'Step 2: Subtract from target -> 9,525 - 6,828.',
              'Ones: 15 - 8 = 7.',
              'Tens: 11 - 2 = 9.',
              'Hundreds: 14 - 8 = 6.',
              'Thousands: 8 - 6 = 2.',
              'Difference = 2,697 cans.'
            ],
            pedagogicalTip: 'Draw a tape diagram with 9,525 at the top to visualize what part is missing.',
            generatorId: 'gen_cans_goal'
          },
          {
            id: 'q_2_6_mitch_critique',
            lessonId: 'lesson_2_6',
            unitId: 'unit_2',
            title: 'Critique Mitch\'s subtraction error',
            prompt: 'Mitch calculated: 657,392 - 434,597 = 222,895. What mistake did Mitch make? What is the correct answer?',
            category: 'error_critique',
            difficulty: 'Intermediate',
            correctAnswer: 'Correct answer is 222,795; Mitch forgot to decrease the hundreds digit after regrouping.',
            explanation: 'In the hundreds place, the 3 was regrouped into 2 because the tens place needed a borrow. Then 2 - 5 required a borrow from thousands, making it 12 - 5 = 7. Mitch incorrectly wrote 8 in the hundreds place. The correct difference is 222,795.',
            solutionSteps: [
              'Ones: 12 - 7 = 5.',
              'Tens: 18 - 9 = 9 (borrowed from hundreds, 3 becomes 2).',
              'Hundreds: 12 - 5 = 7 (Mitch wrote 8!).',
              'Thousands: 6 - 4 = 2.',
              'Ten Thousands: 5 - 3 = 2.',
              'Hundred Thousands: 6 - 4 = 2.',
              'Correct answer = 222,795.'
            ],
            pedagogicalTip: 'Analyzing incorrect work sharpens metacognitive awareness of borrowing chains.',
            generatorId: 'gen_critique_sub'
          }
        ]
      },
      {
        id: 'lesson_2_7',
        unitId: 'unit_2',
        number: '2-7',
        title: 'Subtract Across Zeros',
        subtitle: 'Master the chain regrouping algorithm when subtracting from numbers with consecutive zeros.',
        conceptSummary: 'When subtracting across multiple zeros (e.g. 700,402 - 297,354 or 5,000 - 2,058), regroup from the first non-zero digit to the left. Intermediate zeros become 9s, and the final place receives 10.',
        detailedExplanation: [
          'Exemplary problem from worksheet: 700,402 - 297,354.',
          'Step 1: Regroup across hundreds to ones: 402 becomes 3 hundreds, 9 tens, 12 ones. 12 - 4 = 8; 9 - 5 = 4; 3 - 3 = 0.',
          'Step 2: Regroup across hundred thousands: 7 hundred thousands becomes 6 hundred thousands, 9 ten thousands, 10 thousands. 10 - 7 = 3; 9 - 9 = 0; 6 - 2 = 4.',
          'Result: 403,048.',
          'Nifty "Minus 1" Mental Shortcut: 700,000 - 1 = 699,999. Subtracting from 699,999 requires zero borrows!'
        ],
        visualDemonstration: {
          type: 'vertical_subtraction',
          title: 'Chain Regrouping Across Zeros: 700,402 - 297,354',
          data: {
            kind: 'vertical_op',
            op: '-',
            num1: 700402,
            num2: 297354,
            steps: [
              'Regroup 4 hundreds -> 3 hundreds, 9 tens, 12 ones',
              '12 - 4 = 8 (ones); 9 - 5 = 4 (tens); 3 - 3 = 0 (hundreds)',
              'Regroup 7 hundred thousands -> 6 hundred thousands, 9 ten thousands, 10 thousands',
              '10 - 7 = 3 (thousands); 9 - 9 = 0 (ten thousands); 6 - 2 = 4 (hundred thousands)',
              'Difference: 403,048'
            ]
          }
        },
        rulesAndTips: [
          'Chain Rule: All intermediate zeros in a borrow chain become 9; only the final place that needed the borrow receives 10.',
          'Alternative Check: (700,402 - 297,354) = 403,048. Add back: 403,048 + 297,354 = 700,402.'
        ],
        commonPitfalls: [
          {
            title: 'Turning Every Zero into 10',
            mistake: 'Writing 10 above every single zero across the number.',
            correction: 'Intermediate zeros must become 9 because they lend 1 to the next place to the right.',
            why: 'Failing to realize each place only keeps 9 of the 10 units it borrowed.'
          }
        ],
        questions: [
          {
            id: 'q_2_7_main',
            lessonId: 'lesson_2_7',
            unitId: 'unit_2',
            title: 'Subtract Across Zeros: 700,402 - 297,354',
            prompt: 'Find the difference: 700,402 - 297,354.',
            category: 'subtraction_zeros',
            difficulty: 'Challenge',
            correctAnswer: '403,048',
            visualModel: {
              type: 'vertical_subtraction',
              title: '700,402 - 297,354',
              data: { kind: 'vertical_op', op: '-', num1: 700402, num2: 297354 }
            },
            explanation: 'With chain regrouping across zeros: ones 12 - 4 = 8; tens 9 - 5 = 4; hundreds 3 - 3 = 0; thousands 10 - 7 = 3; ten thousands 9 - 9 = 0; hundred thousands 6 - 2 = 4. Final difference is 403,048.',
            solutionSteps: [
              'Borrow from 4 in hundreds: 4 -> 3; tens 0 -> 9; ones 2 -> 12.',
              '12 - 4 = 8; 9 - 5 = 4; 3 - 3 = 0.',
              'Borrow from 7 in hundred thousands: 7 -> 6; ten thousands 0 -> 9; thousands 0 -> 10.',
              '10 - 7 = 3; 9 - 9 = 0; 6 - 2 = 4.',
              'Answer: 403,048.'
            ],
            pedagogicalTip: 'Notice the middle hundreds digit 3 - 3 produces a clean 0.',
            generatorId: 'gen_across_zeros'
          },
          {
            id: 'q_2_7_rivers',
            lessonId: 'lesson_2_7',
            unitId: 'unit_2',
            title: 'World Rivers Length Comparison',
            prompt: 'The Amazon River is 6,400 km long, Lower Tunguska is 2,989 km, and Ganges is 2,620 km. How much longer is the Amazon River than the Lower Tunguska and Ganges Rivers combined?',
            category: 'subtraction_zeros',
            difficulty: 'Intermediate',
            contextData: {
              tableTitle: 'Lengths of World Rivers',
              headers: ['River', 'Length (km)'],
              rows: [
                ['Nile', '6,650'],
                ['Lower Tunguska', '2,989'],
                ['Senegal', '1,641'],
                ['Ganges', '2,620'],
                ['Amazon', '6,400']
              ]
            },
            correctAnswer: '791 km longer',
            explanation: 'Combined length: 2,989 + 2,620 = 5,609 km. Subtract from Amazon: 6,400 - 5,609 = 791 km.',
            solutionSteps: [
              'Step 1: Sum Tunguska + Ganges -> 2,989 + 2,620 = 5,609 km.',
              'Step 2: Subtract from Amazon -> 6,400 - 5,609.',
              'Borrow across zeros in 6,400: 4 becomes 3; tens becomes 9; ones becomes 10.',
              '10 - 9 = 1; 9 - 0 = 9; 13 - 6 = 7; 5 - 5 = 0.',
              'Difference = 791 km.'
            ],
            pedagogicalTip: 'In 6,400, borrowing from the 4 gives 3 hundreds, 9 tens, and 10 ones.',
            generatorId: 'gen_rivers_diff'
          }
        ]
      },
      {
        id: 'lesson_2_8',
        unitId: 'unit_2',
        number: '2-8',
        title: 'Model with Math: Tape Diagrams',
        subtitle: 'Use bar diagrams and equations with variables to model and solve multi-step problems.',
        conceptSummary: 'A tape diagram visually represents parts and wholes. In a two-step problem, find the intermediate hidden total first before solving for the final unknown.',
        detailedExplanation: [
          'Farmer\'s Apple Harvest: Red apples (3,978) + green apples (2,504) = total a (6,482). Apples sold = 4,856. Apples left for market m: 6,482 - 4,856 = 1,626.',
          'Song Downloads Performance Task: First 4 days: Day 1 (98,273), Day 2 (313,280), Day 3 (106,548), Day 4 (270,463). Days 1 & 2 total: 411,553. Days 3 & 4 total: 377,011. Difference: 411,553 - 377,011 = 34,542.'
        ],
        visualDemonstration: {
          type: 'tape_diagram',
          title: 'Song Downloads: Days 1 & 2 vs Days 3 & 4',
          data: {
            kind: 'tape_diagram',
            totalLabel: 'Days 1 & 2 Total: 411,553 downloads',
            parts: [
              { label: 'Days 3 & 4 Total', value: 377011 },
              { label: 'Difference (d)', value: 34542 }
            ]
          }
        },
        rulesAndTips: [
          'Always identify what the problem asks you to find (the target variable).',
          'Break multi-step word problems into two distinct equations.'
        ],
        commonPitfalls: [
          {
            title: 'Misgrouping Days in Performance Tasks',
            mistake: 'Adding Day 1 with Day 3 instead of Day 1 with Day 2.',
            correction: 'Carefully reread the prompt: "Days 1 and 2 combined" compared to "Days 3 and 4 combined".',
            why: 'Rushing through verbal descriptions without mapping to variable labels.'
          }
        ],
        questions: [
          {
            id: 'q_2_8_apples',
            lessonId: 'lesson_2_8',
            unitId: 'unit_2',
            title: 'Farmer\'s apples quantitative reasoning',
            prompt: 'In a week, a farmer collected 3,978 red apples and 2,504 green apples. He sold 4,856 apples and took the rest to the Farmer\'s Market. How many apples did the farmer have left for the Farmer\'s Market?',
            category: 'tape_diagram_modeling',
            difficulty: 'Intermediate',
            visualModel: {
              type: 'tape_diagram',
              title: 'Apples Harvest and Market Sales',
              data: {
                kind: 'tape_diagram',
                totalLabel: 'Total Apples Collected (a = 6,482)',
                parts: [
                  { label: 'Sold', value: 4856 },
                  { label: 'Market Left (m)', value: 1626, isUnknown: true }
                ]
              }
            },
            correctAnswer: '1,626 apples',
            explanation: 'Step 1: Find total apples collected: a = 3,978 + 2,504 = 6,482 apples. Step 2: Subtract apples sold: m = 6,482 - 4,856 = 1,626 apples left.',
            solutionSteps: [
              'Equation 1 (Total): a = 3,978 + 2,504 = 6,482 apples.',
              'Equation 2 (Left): m = 6,482 - 4,856 = 1,626 apples.'
            ],
            pedagogicalTip: 'Using letters like a and m helps organize the two mathematical steps cleanly.',
            generatorId: 'gen_apples_two_step'
          },
          {
            id: 'q_2_8_songs',
            lessonId: 'lesson_2_8',
            unitId: 'unit_2',
            title: 'Performance Task: Song Downloads Comparison',
            prompt: 'A song was downloaded: Day 1 (98,273), Day 2 (313,280), Day 3 (106,548), and Day 4 (270,463). How many more times was the song downloaded on days 1 and 2 combined than on days 3 and 4 combined?',
            category: 'tape_diagram_modeling',
            difficulty: 'Challenge',
            contextData: {
              tableTitle: 'Times Song Downloaded',
              headers: ['Day', 'Times Downloaded'],
              rows: [
                ['Day 1', '98,273'],
                ['Day 2', '313,280'],
                ['Day 3', '106,548'],
                ['Day 4', '270,463']
              ]
            },
            correctAnswer: '34,542 more times',
            explanation: 'Total days 1 and 2: t = 98,273 + 313,280 = 411,553. Total days 3 and 4: s = 106,548 + 270,463 = 377,011. Difference: d = 411,553 - 377,011 = 34,542.',
            solutionSteps: [
              'Step 1 (Days 1 & 2): 98,273 + 313,280 = 411,553.',
              'Step 2 (Days 3 & 4): 106,548 + 270,463 = 377,011.',
              'Step 3 (Difference): 411,553 - 377,011 = 34,542.'
            ],
            pedagogicalTip: 'Model both pairs with separate bars before finding the difference.',
            generatorId: 'gen_songs_performance'
          }
        ]
      }
    ]
  },
  {
    id: 'unit_3',
    number: 3,
    title: 'Topic 3: Multiply by Multiples of 10, 100, and 1,000',
    description: 'Use basic facts, place value, and the associative property to multiply single digits by multiples of 10, 100, and 1,000.',
    lessons: [
      {
        id: 'lesson_3_1',
        unitId: 'unit_3',
        number: '3-1',
        title: 'Multiply by Multiples of 10, 100, and 1,000',
        subtitle: 'Use place-value patterns and properties of multiplication to find products mentally.',
        conceptSummary: 'Multiply the non-zero digits to find the basic fact product, then append the total number of zeros from the factors.',
        detailedExplanation: [
          'Using the Associative Property: 3 × 70 = 3 × (7 × 10) = (3 × 7) × 10 = 21 × 10 = 210.',
          'Multiplication Pattern: 3 × 7 = 21; 3 × 70 = 210; 3 × 700 = 2,100; 3 × 7,000 = 21,000.',
          'Zero Products Warning: When the basic fact itself ends in zero (e.g. 8 × 5 = 40 or 5 × 6 = 30), that zero is part of the basic fact and does not replace the factor\'s zeros (e.g. 8,000 × 5 = 40,000 has 4 zeros!).'
        ],
        visualDemonstration: {
          type: 'place_value_chart',
          title: 'Growth Pattern: 3 × 7, 3 × 70, 3 × 700, 3 × 7,000',
          data: { kind: 'place_value', number: 21000 }
        },
        rulesAndTips: [
          'First calculate the basic multiplication fact, then count and attach the zeros.',
          'Be alert for basic facts ending in 0 (e.g. 5 × 4 = 20, 5 × 6 = 30, 5 × 8 = 40).'
        ],
        commonPitfalls: [
          {
            title: 'Miscounting Zeros in Basic Facts Ending in Zero',
            mistake: 'Thinking 8,000 × 5 is 4,000 because 8 × 5 is 40 and "there are 3 zeros".',
            correction: '8 × 5 = 40. Then attach the 3 zeros from 8,000 -> 40,000 (total of 4 zeros).',
            why: 'Confusing the zero in the product 40 with one of the zeros in the thousands factor.'
          }
        ],
        questions: [
          {
            id: 'q_3_1_patterns_8',
            lessonId: 'lesson_3_1',
            unitId: 'unit_3',
            title: 'Multiplication pattern for 8 × 20, 8 × 200, 8 × 2,000',
            prompt: 'Find each product using mental math patterns: 8 × 20 = ___, 8 × 200 = ___, 8 × 2,000 = ___.',
            category: 'multiplication_tens',
            difficulty: 'Basic',
            correctAnswer: '160; 1,600; 16,000',
            explanation: 'Basic fact: 8 × 2 = 16. Then 8 × 20 = 16 tens = 160. 8 × 200 = 16 hundreds = 1,600. 8 × 2,000 = 16 thousands = 16,000.',
            solutionSteps: [
              'Basic fact: 8 × 2 = 16.',
              '8 × 20 = 160 (1 zero).',
              '8 × 200 = 1,600 (2 zeros).',
              '8 × 2,000 = 16,000 (3 zeros).'
            ],
            pedagogicalTip: 'Notice the count of zeros in the factor directly matches the count of zeros in the product.',
            generatorId: 'gen_mult_patterns'
          },
          {
            id: 'q_3_1_zero_ending',
            lessonId: 'lesson_3_1',
            unitId: 'unit_3',
            title: 'Product with basic fact ending in zero: 8,000 × 5',
            prompt: 'Find the product: 8,000 × 5. How many zeros are in the final answer?',
            category: 'multiplication_tens',
            difficulty: 'Intermediate',
            correctAnswer: '40,000 (4 zeros)',
            explanation: 'Basic fact: 8 × 5 = 40. Adding the three zeros from 8,000 yields 40,000, which has four zeros in total.',
            solutionSteps: [
              'Multiply non-zero digits: 8 × 5 = 40.',
              'Identify zeros in factors: 8,000 has 3 zeros.',
              'Append zeros: 40 + "000" = 40,000.',
              'Total zeros: 4 zeros.'
            ],
            pedagogicalTip: 'The product 40 brings its own zero in addition to the 3 zeros of 8,000.',
            generatorId: 'gen_mult_zero_product'
          },
          {
            id: 'q_3_1_spaghetti',
            lessonId: 'lesson_3_1',
            unitId: 'unit_3',
            title: 'Mrs. Simms spaghetti noodles cases',
            prompt: 'Mrs. Simms bought 10 cases of spaghetti noodles for the spaghetti dinner fundraiser. There are 8 boxes of spaghetti in each case. How many boxes of noodles did Mrs. Simms buy?',
            category: 'multiplication_tens',
            difficulty: 'Basic',
            correctAnswer: '80 boxes',
            explanation: '10 cases × 8 boxes per case = 80 boxes in all.',
            solutionSteps: [
              'Number of cases: 10.',
              'Boxes per case: 8.',
              'Total: 10 × 8 = 80 boxes.'
            ],
            pedagogicalTip: 'The phrase "in each" indicates equal groups, which signifies multiplication.',
            generatorId: 'gen_spaghetti_word'
          }
        ]
      }
    ]
  }
];

export const ERROR_DETECTIVE_CASES_EN: ErrorDetectiveCase[] = [
  {
    id: 'case_guy',
    title: 'Case #1: Guy\'s Compensation Dilemma',
    studentName: 'Guy',
    problemPrompt: 'Use mental math compensation to find 8,265 - 7,145',
    studentWork: '(8,265 - 55) - (7,145 + 55) = 8,210 - 7,200 = 1,010',
    studentAnswer: '1,010',
    correctAnswer: '1,120',
    diagnosisQuestion: 'What fundamental error did Guy make in his mental math compensation?',
    options: [
      'Guy confused subtraction compensation with addition compensation; in subtraction, you must add the same amount to both numbers to keep the difference constant.',
      'Guy should have rounded 7,145 down instead of up.',
      'Guy made an arithmetic error when subtracting 7,200 from 8,210.',
      'Guy should have subtracted 55 from both numbers instead of adding.'
    ],
    correctOptionIndex: 0,
    explanation: 'In subtraction, distance on the number line is preserved only if BOTH numbers shift by the same amount in the same direction. Subtracting 55 from the minuend and adding 55 to the subtrahend pulled the two numbers closer together by 110, corrupting the answer. Correct: (8,265 + 55) - (7,145 + 55) = 8,320 - 7,200 = 1,120.',
    lessonId: 'lesson_2_1'
  },
  {
    id: 'case_mitch',
    title: 'Case #2: Mitch\'s Disappearing Hundreds',
    studentName: 'Mitch',
    problemPrompt: 'Use the standard vertical algorithm to compute 657,392 - 434,597',
    studentWork: 'Mitch recorded 8 in the hundreds column and announced 222,895.',
    studentAnswer: '222,895',
    correctAnswer: '222,795',
    diagnosisQuestion: 'Why is Mitch\'s hundreds digit incorrect?',
    options: [
      'The hundreds digit 3 was already reduced to 2 when the tens place borrowed from it; 12 - 5 = 7, but Mitch forgot to diminish the 3.',
      'Mitch forgot to carry 1 into the thousands column.',
      'Mitch should have subtracted from left to right.',
      'Mitch subtracted 5 from 3 without borrowing.'
    ],
    correctOptionIndex: 0,
    explanation: 'When the tens place borrowed from hundreds, the digit 3 became 2. Then 2 - 5 required borrowing from thousands to become 12 - 5 = 7. Mitch forgot that 3 had lent a ten, and computed 13 - 5 = 8. The correct answer is 222,795.',
    lessonId: 'lesson_2_6'
  },
  {
    id: 'case_pedometer',
    title: 'Case #3: The Pedometer Borrowing Slip',
    studentName: 'Student Worksheet',
    problemPrompt: 'Naima\'s goal is 88,942 steps. She has walked 43,498 steps. How many more steps does she need?',
    studentWork: '88,942 - 43,498 = 52,444',
    studentAnswer: '52,444 steps',
    correctAnswer: '45,444 steps',
    diagnosisQuestion: 'In which column did the student forget to reduce the top digit after lending?',
    options: [
      'The ten thousands place (the 8 in ten thousands lent to thousands, so it should have been 7 - 4 = 3 or with previous carries 4).',
      'The ones place.',
      'The hundreds place.',
      'The student should have added instead of subtracted.'
    ],
    correctOptionIndex: 0,
    explanation: 'The student made successive borrowing errors without crossing off and diminishing the higher place value digits, ending up off by nearly 7,000 steps. Correct answer: 88,942 - 43,498 = 45,444 steps.',
    lessonId: 'lesson_2_6'
  }
];
