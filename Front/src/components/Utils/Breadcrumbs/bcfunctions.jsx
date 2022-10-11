export function returnCategory(key) {
    switch (key) {
        case '1':
            return 'Smartphones and Telephones';
        case '2':
            return 'For Personal Computers';
        case '3':
            return 'Kitchen appliances';
        case '4':
            return 'Home appliances';
        case '5':
            return 'TV Video';
        case '6':
            return 'Audio';
        case '7':
            return 'Cams and Camcorders';
    }
}

export function returnSubcategory(key) {
    switch (key) {
        case 1:
            return 'Smartphones';
        case 2:
            return 'Accesories for phones';
        case 3:
            return 'Graphic cards';
        case 4:
            return 'Processors';
        case 5:
            return 'Motherboards';
        case 6:
            return 'Fridges';
        case 7:
            return 'Blenders';
        case 8:
            return 'Dishwashers';
        case 9:
            return 'Wash machines';
        case 10:
            return 'Vacuum cleaners';
        case 11:
            return 'Irons';
        case 12:
            return 'Flat TVs';
        case 13:
            return 'TVs accesories';
        case 14:
            return 'Headphones';
        case 15:
            return 'Headsets';
        case 16:
            return 'Cameras';
        case 17:
            return 'Camcorders';
        case 18:
            return 'Quadcopters';
    }
}

export function getCategory(key) {
    switch (key) {
        case 'Smartphones_and_Telephones':
            return 1;
        case 'For_Personal_Computers':
            return 2;
        case 'Kitchen_appliances':
            return 3;
        case 'Home_appliances':
            return 4;
        case 'TV_Video':
            return 5;
        case 'Audio':
            return 6;
        case 'Cams_and_Camcorders':
            return 7;
    }
}

export function getSubcategory(key) {
    switch (key) {
        case 'Smartphones':
            return 1;
        case 'Accesories_for_phones':
            return 2;
        case 'Graphic_cards':
            return 3;
        case 'Processors':
            return 4;
        case 'Motherboards':
            return 5;
        case 'Fridges':
            return 6;
        case 'Blenders':
            return 7;
        case 'Dishwashers':
            return 8;
        case 'Wash_machines':
            return 9;
        case 'Vacuum_cleaners':
            return 10;
        case 'Irons':
            return 11;
        case 'Flat_TVs':
            return 12;
        case 'TVs_accesories':
            return 13;
        case 'Headphones':
            return 14;
        case 'Headsets':
            return 15;
        case 'Cameras':
            return 16;
        case 'Camcorders':
            return 17;
        case 'Quadcopters':
            return 18;
    }
}