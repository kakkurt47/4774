declare var jQuery;

export const FroalaEditorOptions = {
  theme: 'muzika',
  language: 'en',
  key: 'RF4H3B17A9iB6E5C3A4I2I3C9B6C5E5C-11lcsmdhnA-13D-11G5hcj1==',

  toolbarButtons: ['bold', 'italic', 'underline', 'align', 'emoticons', 'fontSize', 'color', 'undo', '-',
    'insertHR', 'paragraphFormat', 'paragraphStyle', 'formatUL', '|',
    'insertLink', 'insertImage', 'insertVideo', 'insertTable', '|', 'html'],
  toolbarButtonsMD: ['bold', 'italic', 'underline', 'align', 'emoticons', 'fontSize', 'color', 'undo', '-',
    'insertHR', 'paragraphFormat', 'paragraphStyle', 'formatUL', '|',
    'insertLink', 'insertImage', 'insertVideo', 'insertTable', '|', 'html'],
  toolbarButtonsSM: ['bold', 'italic', 'underline', 'align', 'emoticons', 'fontSize', 'color', 'undo', '-',
    'insertHR', 'paragraphFormat', 'paragraphStyle', 'formatUL', '|',
    'insertLink', 'insertImage', 'insertVideo', 'insertTable', '|', 'html'],
  toolbarButtonsXS: ['bold', 'italic', 'underline', 'align', 'emoticons', 'fontSize', 'color', 'undo', '-',
    'insertHR', 'paragraphFormat', 'paragraphStyle', 'formatUL', '|',
    'insertLink', 'insertImage', 'insertVideo', 'insertTable', '|', 'html'],
  requestWithCredentials: true,

  imagePaste: false,

  heightMin: 400,
  pluginsEnabled: ['image', 'video', 'colors', 'fontSize', 'link', 'table',
    'url', 'paragraphStyle', 'emoticons', 'align', 'codeView', 'lists'],

  events: {
    'froalaEditor.image.uploaded': null,
    'froalaEditor.initialized': (e, editor) => {
      // console.log(editor);
      editor.$box.find('.fr-toolbar').find('i').each((_, i) => {
        const $i = jQuery(i);
        // console.log($i);

        $i.removeClass('fa')
        // .addClass('fa-lg')
          .addClass('fal')
          .css({fontSize: 'inherit'});

        const replace = {
          'fa-rotate-left': 'fa-undo',
          'fa-rotate-right': 'fa-redo',
          'fa-video-camera': 'fa-camera-retro',
          'fa-smile-o': 'fa-smile',
          'fa-file-o': 'fa-file'
        };

        Object.keys(replace).forEach(key => {
          if ($i.hasClass(key)) {
            $i.removeClass(key).addClass(replace[key]);
          }
        });
      });
    }
  },

  emoticonsStep: 4,
  emoticonsSet: [
    {code: '1f600', desc: '웃는 표정'},
    {code: '1f601', desc: '웃는 표정 + 눈'},
    {code: '1f602', desc: '웃겨서 우는 표정'},
    {code: '1f603', desc: '입 벌리고 웃는 표정'},
    {code: '1f604', desc: '입 벌리고 웃는 표정 + 눈'},
    {code: '1f605', desc: 'Smiling face with open mouth and cold sweat'},
    {code: '1f606', desc: 'Smiling face with open mouth and tightly-closed eyes'},
    {code: '1f607', desc: 'Smiling face with halo'}
  ],

  linkAlwaysBlank: true,

  videoResize: false,
  videoInsertButtons: ['videoBack', '|', 'videoByURL'],
  videoEditButtons: ['videoReplace', 'videoRemove'],

  // Set the image upload parameter.
  imageUploadParam: 'image_param',

  // Set the image upload URL. (Lazy loading)
  imageUploadURL: ``,

  // Additional upload params.
  imageUploadParams: {},

  imageDefaultWidth: 80,

  // Set request type.
  imageUploadMethod: 'POST',

  // Set max image size to 100MB.
  imageMaxSize: 50 * 1024 * 1024,

  imageResizeWithPercent: true,

  // Allow to upload PNG and JPG.
  imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif']
};

export const SheetMusicGenreSelections: { name: string, value: string }[] = [
  { name: 'EDM', value: '~edm' },
  { name: 'New-age', value: '~newage' },
  { name: 'Classic', value: '~classic' },
  { name: 'Jazz', value: '~jazz' },
  { name: 'Pop', value: '~pop' },
  { name: 'Four-hand', value: '~fourhand' },
  { name: 'Animation', value: '~animation' },
  { name: 'OST', value: '~ost' },
  { name: 'CCM', value: '~ccm' },
];

export const StreamingMusicGenreSelections: { name: string, value: string }[] = [
  { name: 'K-POP', value: '~kpop' },
  { name: 'Pop', value: '~pop' },
  { name: 'OST', value: '~ost' },
  { name: 'Jazz', value: '~jazz' },
  { name: 'Dance', value: '~dance' },
  { name: 'EDM', value: '~edm' },
  { name: 'Classic', value: '~classic' },
  { name: 'R&B / Soul', value: '~rnb' },
  { name: 'CCM', value: '~ccm' },
];

// @TODO Add sub selection
export const InstrumentSelections: { name: string, value: string }[] = [
  { name: 'Piano', value: '~piano' },
  { name: 'Guitar', value: '~guitar' },
  { name: 'Violin', value: '~violin' },
  { name: 'Viola', value: '~viola' },
  { name: 'Cello', value: '~cello' },
  { name: 'Flute', value: '~flute' },
  { name: 'Oboe', value: '~oboe' },
  { name: 'Clarinet', value: '~clarinet' },
  { name: 'Horn', value: '~horn' },
  { name: 'Saxophone', value: '~saxophone' },
  { name: 'Trumpet', value: '~trumpet' },
  { name: 'Trombone', value: '~trombone' },
  { name: 'Drum', value: '~drum' },
  { name: 'Vocal', value: '~vocal' },
];
