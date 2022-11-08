export type Journal = {
  object: string;
  id: string;
  cover: undefined;
  icon: {
    type: string;
    emoji: string;
  };
  created_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  last_edited_time: string;
  title: [
    {
      type: string;
      text: {
        content: string;
        link: undefined;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href: undefined;
    }
  ];
  description: [
    {
      type: string;
      text: {
        content: string;
        link: undefined;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href: undefined;
    },
    {
      type: string;
      text: {
        content: string;
        link: undefined;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href: undefined;
    },
    {
      type: string;
      text: {
        content: string;
        link: undefined;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href: undefined;
    },
    {
      type: string;
      text: {
        content: string;
        link: undefined;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href: undefined;
    },
    {
      type: string;
      text: {
        content: string;
        link: undefined;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href: undefined;
    },
    {
      type: string;
      text: {
        content: string;
        link: undefined;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href: undefined;
    },
    {
      type: string;
      text: {
        content: string;
        link: undefined;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href: undefined;
    },
    {
      type: string;
      text: {
        content: string;
        link: undefined;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href: undefined;
    },
    {
      type: string;
      text: {
        content: string;
        link: undefined;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href: undefined;
    }
  ];
  is_inline: boolean;
  properties: {
    Tags: {
      id: string;
      name: string;
      type: string;
      multi_select: {
        options: [
          {
            id: string;
            name: string;
            color: string;
          },
          {
            id: string;
            name: string;
            color: string;
          },
          {
            id: string;
            name: string;
            color: string;
          },
          {
            id: string;
            name: string;
            color: string;
          },
          {
            id: string;
            name: string;
            color: string;
          }
        ];
      };
    };
    "Post Date": {
      id: string;
      name: string;
      type: string;
      date: Record<string, any>;
    };
    Date: {
      id: string;
      name: string;
      type: string;
      date: Record<string, any>;
    };
    Status: {
      id: string;
      name: string;
      type: string;
      status: {
        options: [
          {
            id: string;
            name: string;
            color: string;
          },
          {
            id: string;
            name: string;
            color: string;
          },
          {
            id: string;
            name: string;
            color: string;
          },
          {
            id: string;
            name: string;
            color: string;
          }
        ];
        groups: [
          {
            id: string;
            name: string;
            color: string;
            option_ids: string[];
          },
          {
            id: string;
            name: string;
            color: string;
            option_ids: string[];
          },
          {
            id: string;
            name: string;
            color: string;
            option_ids: string[];
          }
        ];
      };
    };
    Created: {
      id: string;
      name: string;
      type: string;
      created_time: Record<string, any>;
    };
    Name: {
      id: string;
      name: string;
      type: string;
      title: Record<string, any>;
    };
  };
  parent: {
    type: string;
    workspace: boolean;
  };
  url: string;
  archived: boolean;
};

export type Page = {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  cover: undefined;
  icon: undefined;
  parent: {
    type: string;
    database_id: string;
  };
  archived: boolean;
  properties: {
    Tags: {
      id: string;
      type: string;
      multi_select: [
        {
          id: string;
          name: string;
          color: string;
        }
      ];
    };
    "Post Date": {
      id: string;
      type: string;
      date: {
        start: string;
        end: undefined;
        time_zone: undefined;
      };
    };
    Date: {
      id: string;
      type: string;
      date: undefined;
    };
    Status: {
      id: string;
      type: string;
      status: {
        id: string;
        name: string;
        color: string;
      };
    };
    Created: {
      id: string;
      type: string;
      created_time: string;
    };
    Name: {
      id: string;
      type: string;
      title: [
        {
          type: string;
          text: {
            content: string;
            link: undefined;
          };
          annotations: {
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
            code: boolean;
            color: string;
          };
          plain_text: string;
          href: undefined;
        }
      ];
    };
  };
  url: string;
};
