const smplBellCurve = (x, s) => {
    let firstDevMinus = x - s;
    let firstDevPlus = x + s;
    let secondDevMinus = (2 * s) - x;
    let secondDevPlus = (2 * s) + x;
    let thirdDevMinus = (3 * s) - x;
    let thirdDevPlus = (3 * s) + x; 
    firstDevMinus = firstDevMinus.toFixed(2);
    firstDevPlus = firstDevPlus.toFixed(2);
    secondDevMinus = secondDevMinus.toFixed(2);
    secondDevPlus = secondDevPlus.toFixed(2);
    thirdDevMinus = thirdDevMinus.toFixed(2);
    thirdDevPlus = thirdDevPlus.toFixed(2);
    
    return ['\n',
    ['                                                       .                                   '], '\n',
    ['                                                   .   |   .                               '], '\n',
    [`                             ${firstDevMinus}    .     |     .  ${firstDevPlus}                      `], '\n',
    ['                                                .      |      .                            '], '\n',
    ['                                               .       |       .                           '], '\n',
    ['                                              .        |        .                          '], '\n',
    ['                                             .         |         .                         '], '\n',
    ['                                            .          |          .                        '], '\n',
    ['                                           .           |           .                         '], '\n',
    [`                     ${secondDevMinus}    .            |             .  ${secondDevPlus}             `], '\n',
    ['                                       .               |                .                  '], '\n',
    ['                                   .                   |                    .              '], '\n',
    [`         ${thirdDevMinus}    .                         |                           . ${thirdDevPlus}`], '\n']
}

    module.exports = smplBellCurve;
