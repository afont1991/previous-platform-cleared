const fakeDealFilterData = {
  deal_general: [],
  deal_type: [],
  deal_size: [],
  deal_characteristics: [],
  deal__industries: [],
  deal__status: [],
  deal__capital_type: [],
  deal__financials: [],
  deal__borrower_financials: [],
  deal__borrower_industies: [],
};

const fakeCompanyFilterData = {
  company_type: [],
  company_financials: [],
  company_financials: [],
};

const fakeCompanySearchResults = [
  {
    name: "Comvest",
    hq_location: "West Palm Beach, FL",
    aum: "$2400M",
    active_investments: 22,
    new_investments: 4,
    type_of_capital: 'Senior, Junior',
    hold_size: '10-50',
    investment_size: '< 100',
    rating: 5,
  },
  {
    name: "AB Private Credit Investors",
    hq_location: "Chicago, IL",
    aum: "$2400M",
    active_investments: 22,
    new_investments: 4,
    type_of_capital: 'Senior, Junior',
    hold_size: '10-50',
    investment_size: '< 100',
    rating: 5,
  },
  {
    name: "Alcentra Capital",
    hq_location: "Chicago, IL",
    aum: "$2400M",
    active_investments: 22,
    new_investments: 4,
    type_of_capital: 'Senior, Junior',
    hold_size: '10-50',
    investment_size: '< 100',
    rating: 5,
  },
  {
    name: "American Capital",
    hq_location: "Chicago, IL",
    aum: "$2400M",
    active_investments: 22,
    new_investments: 4,
    type_of_capital: 'Senior, Junior',
    hold_size: '10-50',
    investment_size: '< 100',
    rating: 5,
  },
  {
    name: "Anchorage Capital Group",
    hq_location: "Chicago, IL",
    aum: "$2400M",
    active_investments: 22,
    new_investments: 4,
    type_of_capital: 'Senior, Junior',
    hold_size: '10-50',
    investment_size: '< 100',
    rating: 5,
  },
  {
    name: "Angel Island Partners",
    hq_location: "Chicago, IL",
    aum: "$2400M",
    active_investments: 22,
    new_investments: 4,
    type_of_capital: 'Senior, Junior',
    hold_size: '10-50',
    investment_size: '< 100',
    rating: 5,
  },
  {
    name: "Antares Capital",
    hq_location: "Chicago, IL",
    aum: "$2400M",
    active_investments: 22,
    new_investments: 4,
    type_of_capital: 'Senior, Junior',
    hold_size: '10-50',
    investment_size: '< 100',
    rating: 5,
  },
  {
    name: "Apollo Global Management",
    hq_location: "Chicago, IL",
    aum: "$2400M",
    active_investments: 22,
    new_investments: 4,
    type_of_capital: 'Senior, Junior',
    hold_size: '10-50',
    investment_size: '< 100',
    rating: 5,
  },
  {
    name: "Ares Management",
    hq_location: "Chicago, IL",
    aum: "$2400M",
    active_investments: 22,
    new_investments: 4,
    type_of_capital: 'Senior, Junior',
    hold_size: '10-50',
    investment_size: '< 100',
    rating: 5,
  },
  {
    name: "Audax Group",
    hq_location: "Chicago, IL",
    aum: "$2400M",
    active_investments: 22,
    new_investments: 4,
    type_of_capital: 'Senior, Junior',
    hold_size: '10-50',
    investment_size: '< 100',
    rating: 5,
  },
];

const fakePlaceHolderFilterData = {
  sections: [
    {
      section_name: 'Lender Criteria',
      sub_sections: [
        {
          sub_section_name: "Financials",
          sub_section_type: 'checkmark',
          select_all: false,
          sub_section_values: [
            {
              display: 'Revenue TTM',
              id: 'revenue_ttm',
              value: false,
              selected: false
            },
            {
              display: 'EBITDA TTM',
              id: 'ebitda_ttm',
              value: false,
              selected: false
            }
          ],
        },
        {
          sub_section_name: "Debt Type",
          sub_section_type: 'checkmark',
          select_all: false,
          sub_section_values: [
            {
              display: 'Senior Term',
              id: 'senior_term',
              value: false,
              selected: false
            },
            {
              display: 'Senior Revolver',
              id: 'senior_revolver',
              value: false,
              selected: false
            },
            {
              display: 'Senior Stretch',
              id: 'senior_stretch',
              value: false,
              selected: false
            },
            {
              display: 'Unitranche',
              id: 'unitranche',
              value: false,
              selected: false
            },
            {
              display: 'First Lien',
              id: 'first_lien',
              value: false,
              selected: false
            },
            {
              display: 'Second Lien',
              id: 'second_lien',
              value: false,
              selected: false
            },
            {
              display: 'Junior Secured',
              id: 'junior_secured',
              value: false,
              selected: false
            },
            {
              display: 'Mezzanine',
              id: 'mezzanine',
              value: false,
              selected: false
            },
          ],
        },
        {
          sub_section_name: "Deal Status",
          sub_section_type: 'checkmark',
          select_all: false,
          sub_section_values: [
            {
              display: 'Out To Market',
              id: 'out_to_market',
              value: false,
              selected: false
            },
            {
              display: 'Accepting Indications of Interest',
              id: 'indications',
              value: false,
              selected: false
            },
            {
              display: 'Pre-Marketing',
              id: 'pre_marketing',
              value: false,
              selected: false
            },
          ],
        },
        {
          sub_section_name: "Sponsor AUM",
          sub_section_type: 'checkmark',
          select_all: false,
          sub_section_values: [
            {
              display: 'Undisclosed',
              id: 'undisclosed',
              value: false,
              selected: false
            },
            {
              display: 'Fundless',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: '< 100',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: '100-250',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: '250-500',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: '500-1,000',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: '>1,000',
              id: 'filter_option',
              value: false,
              selected: false
            },
          ],
        },
      ],
    },
    {
      section_name: 'Lender Industries',
      sub_sections: [
        {
          sub_section_name: "Indusry list 1",
          sub_section_type: 'checkmark',
          select_all: false,
          sub_section_values: [
            {
              display: 'Filter Option',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: 'Filter Option',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: 'Filter Option',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: 'Filter Option',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: 'Filter Option',
              id: 'filter_option',
              value: false,
              selected: false
            },
          ],
        },
        {
          sub_section_name: "Indusry list 2",
          sub_section_type: 'checkmark',
          select_all: false,
          sub_section_values: [
            {
              display: 'Filter Option',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: 'Filter Option',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: 'Filter Option',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: 'Filter Option',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: 'Filter Option',
              id: 'filter_option',
              value: false,
              selected: false
            },
          ],
        },
        {
          sub_section_name: "Indusry list 3",
          sub_section_type: 'checkmark',
          select_all: false,
          sub_section_values: [
            {
              display: 'Filter Option',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: 'Filter Option',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: 'Filter Option',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: 'Filter Option',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: 'Filter Option',
              id: 'filter_option',
              value: false,
              selected: false
            },
          ],
        },
      ],
    },
    {
      section_name: 'Lender General',
      sub_sections: [
        {
          sub_section_name: "Regions of Interest",
          sub_section_type: 'checkmark',
          select_all: false,
          sub_section_values: [
            {
              display: 'Northeast',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: 'Southeast',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: 'Midwest',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: 'Northwest',
              id: 'filter_option',
              value: false,
              selected: false
            },
            {
              display: 'Southwest',
              id: 'filter_option',
              value: false,
              selected: false
            },
          ],
        },
      ],
    }
  ]
}

export { fakePlaceHolderFilterData, fakeCompanySearchResults }
