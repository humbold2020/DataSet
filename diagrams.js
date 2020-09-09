const smplBellCurve = (x, s) => {
    firstDevMinus = x - s;
    firstDevPlus = x + s;
    secondDevMinus = x - (2 * s);
    secondDevPlus = (2 * s) + x;
    thirdDevMinus =x - (3 * s);
    thirdDevPlus = (3 * s) + x; 
    firstDevMinus = parseFloat(firstDevMinus.toFixed(2));
    firstDevPlus = parseFloat(firstDevPlus.toFixed(2));
    secondDevMinus = parseFloat(secondDevMinus.toFixed(2));
    secondDevPlus = parseFloat(secondDevPlus.toFixed(2));
    thirdDevMinus = parseFloat(thirdDevMinus.toFixed(2));
    thirdDevPlus = parseFloat(thirdDevPlus.toFixed(2));
    
    console.log(['\n',
    ['                                                       .                                   '], '\n',
    ['                                                   .   |   .                               '], '\n',
    [`                                x - s :  ${firstDevMinus}    .     |     .  x + s : ${firstDevPlus}                      `], '\n',
    ['                                                .      |      .                            '], '\n',
    ['                                               .       |       .                           '], '\n',
    ['                                              .        |        .                          '], '\n',
    ['                                             .         |         .                         '], '\n',
    ['                                            .          |          .                        '], '\n',
    ['                                           .           |           .                         '], '\n',
    [`                         x - 2s : ${secondDevMinus}    .            |             .  x + 2s : ${secondDevPlus}             `], '\n',
    ['                                       .               |                .                  '], '\n',
    ['                                   .                   |                    .              '], '\n',
    [`            x - 3s : ${thirdDevMinus}    .                         |                           . x + 3s : ${thirdDevPlus}`], '\n'])
    variables = [firstDevMinus, secondDevMinus, thirdDevMinus, firstDevPlus, secondDevPlus, thirdDevPlus];
    return variables;
}

    module.exports = smplBellCurve;
