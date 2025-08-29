'use strict';

{
  const MEMBERS = [
    { id: 'shoma', nickname: 'しょうま', avatar: 'IMG_4210.JPG', role: 'member', birthday: 328 },
    { id: 'ryutoku', nickname: 'りゅうとく', avatar: 'IMG_4211.JPG', role: 'member', birthday: 104 },
    { id: 'ryuji', nickname: '梅ちゃん', avatar: 'IMG_4212.JPG', role: 'member', birthday: 325 },
  ];

  // let loginLog;

  // if (localStorage.getItem('loginLog') === null) {
  //   loginLog = [];
  // } else {
  //   loginLog = JSON.parse(localStorage.getItem('loginLog'));
  // }

  let loginLog;
  try {
    const stored = JSON.parse(localStorage.getItem('loginLog'));
    loginLog = Array.isArray(stored) ? stored : [];
  } catch (e) {
    loginLog = [];
  }


  const loginPage = document.getElementById('login-page');
  const welcome = document.getElementById('welcome');
  const contentList = document.getElementById('contentList');
  const comments = document.getElementById('comments');
  const bye = document.getElementById('bye');
  const numbertuch = document.getElementById('numbertuch');
  const typing = document.getElementById('typing');
  const slot = document.getElementById('slot');

  loginPage.hidden = false;
  welcome.hidden = true;
  contentList.hidden = true;
  comments.hidden = true;
  bye.hidden = true;
  numbertuch.hidden = true;
  typing.hidden = true;
  slot.hidden = true;

  const close = document.getElementById('close');

  close.addEventListener('click', () => {
    document.body.classList.remove('mask');

    loginPage.hidden = true;
    bye.hidden = false;
  })


  const shoma = document.getElementById('shoma');
  const ryutoku = document.getElementById('ryutoku');
  const ryuji = document.getElementById('ryuji');

  document.querySelectorAll('.member').forEach(memberDiv => {
    memberDiv.addEventListener('click', () => {
      const clickedId = memberDiv.id;
      const member = MEMBERS.find(m => m.id === clickedId);

      const passward = Number(prompt('あなたの誕生日は？ ※1月1日→101'));

      if (passward !== member.birthday) {
        return;
      }

      document.body.classList.remove('mask');

      const section = document.getElementById('welcome');
      const container = section.querySelector('div');

      const img = document.createElement('img');
      img.src = member.avatar;
      const h1 = document.createElement('h1');
      h1.textContent = `🎉${member.nickname}さんようこそ！🎉`;
      container.append(img, h1);

      loginPage.hidden = true;
      welcome.hidden = false;
      contentList.hidden = false;
      comments.hidden = true;

      const entry = { id: clickedId, time: new Date().toLocaleString() };
      loginLog.push(entry);
      localStorage.setItem('loginLog', JSON.stringify(loginLog));
    });
  });


  const listOmikuji = document.getElementById('list-omikuji');
  const listNumbertuch = document.getElementById('list-numbertuch');
  const listSlot = document.getElementById('list-slot');
  const listLyricsTyping = document.getElementById('list-lyrics-typing');

  listNumbertuch.addEventListener('click', () => {

    const levels = Number(prompt('レベルを設定してください。 ※レベル1〜6'));
    
    if (levels > 6) {
      return;
    }

    class Panel {
      constructor(game) {
        this.game = game;
        this.el = document.createElement('li');
        this.el.classList.add('pressed');
        this.el.addEventListener('click', () => {
          this.check();
        })
      }

      getEl() {
        return this.el;
      }

      activate(num) {
        this.el.classList.remove('pressed');
        this.el.textContent = num;
      }

      check() {
        if (this.game.getCurrentNum() === parseInt(this.el.textContent, 10)) {
          this.el.classList.add('pressed');
          this.game.addCurrentNum();

          if (this.game.getCurrentNum() === this.game.getLevel() ** 2) {
            clearTimeout(this.game.getTimeoutId());
          }
        }
      }
    }

    class Board {
      constructor(game) {
        this.game = game;
        this.panels = [];
        for (let i = 0; i < this.game.getLevel() ** 2; i++) {
          this.panels.push(new Panel(this.game));
        }
        this.setup();
      }

      setup() {
        const board = document.getElementById('board');
        this.panels.forEach(panel => {
          board.appendChild(panel.getEl());
        });
      }

      activate() {
        const nums = [];
        for (let i = 0; i < this.game.getLevel() ** 2; i++) {
          nums.push(i);
        }


          this.panels.forEach(panel => {
            const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
            panel.activate(num);
          });
        }
      }


    class Game {
      constructor(level) {
        this.level = level;
        this.board = new Board(this);

        this.currentNum = undefined;
        this.startTime = undefined;
        this.timeoutId = undefined;

        const btn = document.getElementById('btn');
        btn.addEventListener('click', () => {
          this.start();
        });
        this.setup();
      }

      setup() {
        const container = document.getElementById('container');
        const PANEL_WIDTH = 50;
        const BOARD_PADDING = 10;
        container.style.width = PANEL_WIDTH * this.level + BOARD_PADDING * 2 + 'px';
      }

      start() {
        if (typeof this.timeoutId !== 'undefined') {
          clearTimeout(this.timeoutId);
        }

        this.currentNum = 0;
        this.board.activate();

        this.startTime = Date.now();
        this.runTimer();
      }

      runTimer() {
        const timer = document.getElementById('timer');
        timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);

        this.timeoutId = setTimeout(() => {
          this.runTimer();
        }, 10);
      }

      addCurrentNum() {
        this.currentNum++;
      }

      getCurrentNum() {
        return this.currentNum;
      }

      getTimeoutId() {
        return this.timeoutId;
      }

      getLevel() {
        return this.level;
      }
    }

    new Game(levels + 1);


    loginPage.hidden = true;
    welcome.hidden = true;
    contentList.hidden = true;
    comments.hidden = true;
    bye.hidden = true;
    numbertuch.hidden = false;
    typing.hidden = true;
    slot.hidden = true;
  })


  listLyricsTyping.addEventListener('click', () => {

    const ginnnoryuunoseninotte = document.getElementById('ginnnoryuunoseninotte');
    const loverain = document.getElementById('loverain');
    const manatunokajitu = document.getElementById('manatunokajitu');

    const lyricsSelection = document.getElementById('lyrics-selection');

    lyricsSelection.hidden = false;

    let words;
    let wordKanas;

    ginnnoryuunoseninotte.addEventListener('click', () => {
      const ginnnoryuunoseninotteWords = [
        'anoaozametauminokanatade',
        'imamasanidarekagaitanndeiru',
        'madatobenaihinatatimitaini',
        'bokuhakonohirikiwonageiteiru',
        'isogekanasimitubasanikaware',
        'isogekizuatorasinbanninare',
        'madatobenaihinatatimitaini',
        'bokuhakonohirikiwonageiteiru',
        'yumegamukaenikitekurerumade',
        'huruetematterudakenokinou',
        'asitabokuharyuunoasimotohegakewonobori',
        'yobuyosaaikouze',
        'ginnnoryuunoseninotte',
        'todokeniyukouinotinosabakue',
        'ginnnoryuunoseninotte',
        'hakonndeikouamagumonouzuwo',
      ];
      const ginnnoryuunoseninotteWordKanas = [
        'あの蒼ざめた海の彼方で',
        '今まさに誰かが傷んでいる',
        'まだ飛べない雛たちみたいに',
        '僕はこの非力を嘆いている',
        '急げ悲しみ翼に変われ',
        '急げ傷跡羅針盤になれ',
        'まだ飛べない雛たちみたいに',
        '僕はこの非力を嘆いている',
        '夢が迎えに来てくれるまで',
        '震えて待っているだけだった昨日',
        '明日僕は龍の足元へ崖を登り',
        '呼ぶよさあ行こうぜ',
        '銀の龍の背に乗って',
        '届けに行こう命の砂漠へ',
        '銀の龍の背に乗って',
        '運んで行こう雨雲の渦を',
      ];
      words = ginnnoryuunoseninotteWords;
      wordKanas = ginnnoryuunoseninotteWordKanas;

      lyricsSelection.hidden = true;
      typing.hidden = false;
    })

    loverain.addEventListener('click', () => {
      const loverainWords = [
        'tomaranaiamegakoigahurasetaamega',
        'hutariwokinouhekaesanai',
        'koorinokazenomannmannnakawohitorisusunndaumorenaiyou',
        'kogoetahohowoimaazukeyousonotedeHold me, Baby',
        'sizukanisaitakireinahananibokunokakugogamewokosuridasu',
        'hutarideotitakoinomahouSpecial Lady kienaide',
        'tukinisottomimamorareteruyounayawarakaiuzunonaka',
        'mirainosinnwanikizamaresounamonogataritukuro',
        'konomamakiminomunenitobikonndamama',
        'ubaitaizuttonamidamosonohitomimo',
        'tomaranaiamegakoigahurasetaamega',
        'hutariwokinouhekaesanai',
      ];
      const loverainWordKanas = [
        '止まらない雨が恋が降らせた雨が',
        '二人を昨日へ返さない',
        '氷の風の真ん真ん中をひとり進んだ埋もれないよう',
        '凍えた頬を今あずけようその手で Hold me, Baby',
        '静かに咲いたきれいな花に僕の覚悟が目をこすりだす',
        '二人で落ちた恋の魔法 Special Lady 消えないで',
        '月にそっと見守られるような柔らかい渦の中',
        '未来の神話に刻まれそうな物語作ろう',
        'このまま君の胸に飛び込んだまま',
        '奪いいたいずっと涙もその瞳も',
        '止まらない雨が恋が降らせた雨が',
        '二人を昨日へ返さない',
      ];
      words = loverainWords;
      wordKanas = loverainWordKanas;

      lyricsSelection.hidden = true;
      typing.hidden = false;
    })

    manatunokajitu.addEventListener('click', () => {
      const manatunokajituWords = [
        'namidagaahurerukanasiikisetuha',
        'darekanidakaretayumewoniru',
        'nakitaikimotihakotobanidekinai',
        'konnyamotumetaiamegahuru',
        'koraekirenakutetameikibakari',
        'imamokonomuneninatuhameguru',
        'sirokujityuumosukitoitte',
        'yumenonakahetureteitte',
        'wasurerarenai Heat and Soul',
        'koeninaranai',
        'sunanikaitanamaekesite',
        'karahadokohekaerunoka',
        'toorisugiyuku Love and Roll',
        'aiwosonomamani',
      ];
      const manatunokajituWordKanas = [
        '涙があふれる悲しい季節は',
        '誰かに抱かれた夢を見る',
        '泣きたい気持ちは言葉に出来ない',
        '今夜も冷たい雨が降る',
        'こらええきれなくてため息ばかり',
        '今もこの胸に夏は巡る',
        '四六時中も好きと言って',
        '夢の中に連れて行って',
        '忘れられない Heat and Soul',
        '声にならない',
        '砂に書いた名前消して',
        '彼はどこへ帰るのか',
        '通り過ぎ行く Love and Roll',
        '愛をそのままに',
      ];
      words = manatunokajituWords;
      wordKanas = manatunokajituWordKanas;

      lyricsSelection.hidden = true;
      typing.hidden = false;
    })



    function setWord() {
      word = words.splice(0, 1)[0];
      let wordKana = wordKanas.splice(0, 1)[0];
      target.textContent = word;
      kana.textContent = wordKana;
      loc = 0;
    }

    let word;
    let loc = 0;
    let startTime = 0;
    let isPlaying = false;
    let missTyping = 0;
    const target = document.getElementById('target');
    const kana = document.getElementById('kana');

    target.addEventListener('click', () => {
      if (isPlaying === true) {
        return;
      }

      isPlaying = true;
      startTime = Date.now();
      setWord();
    })

    document.addEventListener('keydown', e => {
      if (e.key !== word[loc]) {
        if (isPlaying === true) {
          missTyping++;
          result.textContent = `made a mistake ${missTyping} times!`;
        }
        return;
      }
      loc++;
      target.textContent = '_'.repeat(loc) + word.substring(loc);

      if (loc === word.length) {
        if (words.length === 0) {
          const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
          const result = document.getElementById('result');
          target.textContent = ``;
          kana.textContent = ``;
          result.textContent = `Finished! ${elapsedTime} second!`;
          isPlaying = false;
          return;
        }

        setWord();
      }
    });

    loginPage.hidden = true;
    welcome.hidden = true;
    contentList.hidden = true;
    comments.hidden = true;
    bye.hidden = true;
    slot.hidden = true;
  });


  listSlot.addEventListener('click', () => {

    let panel1Pattern, panel2Pattern, panel3Pattern;
    let bonus = false;
    const gogoLamp = document.getElementById('gogo-lamp');
    let bonusCounter = 0;
    const bonusEnd = 8;
    let normalCounter = 3;
    let janbari = false;
    let janbariCounter = 0;
    const janbariEnd = 8;
    let clownCounter;


    const gogoSe = new Audio('SlotMp3/JugglerGogo.mp3');
    gogoSe.preload = 'auto';
    const bonusSe = new Audio('SlotMp3/JugglerBonus.mp3');
    bonusSe.preload = 'auto';
    bonusSe.loop = true;
    const stopSe = new Audio('SlotMp3/JugglerButton.mp3');
    stopSe.preload = 'auto';
    const bonusEndSe = new Audio('SlotMp3/JugglerBonusEnd.mp3');
    stopSe.preload = 'auto';
    const janbariSe = new Audio('SlotMp3/JugglerJanbari.mp3');
    stopSe.preload = 'auto';
    janbariSe.loop = true;


    class Panel {
      constructor() {
        const section = document.createElement('section');
        section.classList.add('panel');

        this.img = document.createElement('img');
        this.img.src = this.getRandomImage();

        this.timeoutId = undefined;

        this.stop = document.createElement('div');
        this.stop.textContent = 'STOP';
        this.stop.classList.add('stop', 'inactive');

        this.stop.addEventListener('click', () => {
          if (this.stop.classList.contains('inactive')) {
            return;
          }
          stopSe.currentTime = 0;
          stopSe.play();
          this.stop.classList.add('inactive');
          clearTimeout(this.timeoutId);

          panelsLeft--;

          if (gogoLamp?.matches('.glow')) {
            this.img.src = 'SlotImg/seven.png';
          }

          if (bonus === true) {
            if (clownCounter === 0) {
              this.img.src = 'SlotImg/clown.png';
            } else {
              this.img.src = 'SlotImg/grape.png';
            }
          }
          if (janbari === true) {
            if (clownCounter === 0) {
              this.img.src = 'SlotImg/clown.png';
            } else {
              this.img.src = 'SlotImg/grape.png';
            }
          }

          if (panelsLeft === 2) {
            panel1Pattern = this.img.src;
          }
          if (panelsLeft === 1) {
            panel2Pattern = this.img.src;
          }
          if (panelsLeft === 0) {
            panel3Pattern = this.img.src;
            console.log(panel1Pattern);
            console.log(panel2Pattern);
            console.log(panel3Pattern);
            normalCounter++;
            clownCounter = Math.floor(Math.random() * 5);
            console.log(`ノーマルカウンター${normalCounter}`);

            gogoLamp.classList.add('dim');
            gogoLamp.classList.remove('glow');

            if ([panel1Pattern, panel2Pattern, panel3Pattern].every(src => src.toLowerCase().endsWith('slotimg/grape.png'))) {
              if (bonusCounter === bonusEnd) {
                bonus = false;
                console.log(`ボーナス${bonus}`);
                bonusSe.pause();
                bonusSe.currentTime = 0;
                bonusEndSe.currentTime = 0;
                bonusEndSe.play();
                bonusCounter = 0;
                normalCounter = 0;
              }
              if (janbariCounter === janbariEnd) {
                janbari = false;
                console.log(`ジャンバリ${janbari}`);
                janbariSe.pause();
                janbariSe.currentTime = 0;
                janbariCounter = 0;
                normalCounter = 0;
              }
              bonusCounter++;
              console.log(`ボーナスカウンター${bonusCounter}`);
              janbariCounter++;
              console.log(`ジャンバリカウンター${janbariCounter}`);
            }
            if ([panel1Pattern, panel2Pattern, panel3Pattern].every(src => src.toLowerCase().endsWith('slotimg/seven.png'))) {
              if (normalCounter === 2) {
                janbari = true;
                console.log(`ジャンバリ${janbari}`);
                janbariSe.currentTime = 0;
                janbariSe.play();
              } else {
                bonus = true;
                console.log(`ボーナス${bonus}`);
                bonusSe.currentTime = 0;
                bonusSe.play();
              }
            } else {
              if ([panel1Pattern, panel2Pattern, panel3Pattern].every(src => src.toLowerCase().endsWith('slotimg/grape.png'))) {
              } else {
                if (bonus === false) {
                  if (janbari === false) {
                    if (gogonumber === 1) {
                      gogoLamp.classList.remove('dim');
                      gogoLamp.classList.add('glow');

                      gogoSe.currentTime = 0;
                      gogoSe.play();
                    }
                  }

                }
              }
            }
          }

          if (panelsLeft === 0) {
            spin.classList.remove('inactive');
            panelsLeft = 3;
            checkResult();
          }
        });

        section.appendChild(this.img);
        section.appendChild(this.stop);

        const main = document.querySelector('#slot main');
        main.appendChild(section);
      }

      getRandomImage() {
        const images = [
          'SlotImg/seven.png',
          'SlotImg/bar.png',
          'SlotImg/bell.png',
          'SlotImg/cherry.png',
          'SlotImg/clown.png',
          'SlotImg/grape.png',
          'SlotImg/rhinoceros.png',
        ];
        return images[Math.floor(Math.random() * images.length)];
      }

      spin() {
        this.img.src = this.getRandomImage();
        this.timeoutId = setTimeout(() => {
          this.spin();
        }, 50);
      }

      isUnmatched(p1, p2) {
        return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
      }

      unmatch() {
        this.img.classList.add('unmatched');
      }

      activate() {
        this.img.classList.remove('unmatched');
        this.stop.classList.remove('inactive');
      }
    }

    function checkResult() {
      if (panels[0].isUnmatched(panels[1], panels[2])) {
        panels[0].unmatch();
      }
      if (panels[1].isUnmatched(panels[0], panels[2])) {
        panels[1].unmatch();
      }
      if (panels[2].isUnmatched(panels[0], panels[1])) {
        panels[2].unmatch();
      }
    }

    const panels = [
      new Panel(),
      new Panel(),
      new Panel(),
    ];

    let panelsLeft = 3;
    let gogonumber = 0;
    const gogoProbability = 10;

    const spin = document.getElementById('spin');
    const spinSe = new Audio('SlotMp3/JugglerLever.mp3');
    spinSe.preload = 'auto';
    spin.addEventListener('click', () => {
      if (spin.classList.contains('inactive')) {
        return;
      }
      spinSe.currentTime = 0;
      spinSe.play();

      gogonumber = Math.floor(Math.random() * gogoProbability);
      console.log(`ゴーゴーナンバー${gogonumber}`);
      spin.classList.add('inactive');

      panels.forEach(panel => {
        panel.activate();
        panel.spin();
      });
    });


    loginPage.hidden = true;
    welcome.hidden = true;
    contentList.hidden = true;
    comments.hidden = true;
    bye.hidden = true;
    slot.hidden = false;
  })






  // //class=memberをクリックしたときにmaskを消して、welcome,commentを表示
  // document.querySelectorAll('.member').forEach(el => {
  //   el.addEventListener('click', onClick);
  // });

  // function onClick(e) {
  //   document.body.classList.remove('mask');

  //   loginPage.hidden = true;
  //   welcome.hidden = false;
  //   comments.hidden = false;
  // }

}