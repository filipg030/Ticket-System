class Ticket{
    done = false;
    id = 0;

    constructor(imie,nazwisko,pietro,sala,problem,powaga){
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.pietro = pietro;
        this.sala = sala;
        this.problem = problem;
        this.powaga = powaga;
    }

    isValid(){
        //check if any value is null

        if(this.imie == null) return false;
        if(this.nazwisko == null) return false;
        if(this.pietro == null) return false;
        if(this.sala == null) return false;
        if(this.problem == null) return false;
        if(this.powaga == null || (this.powaga != 0 && this.powaga != 1 && this.powaga != 2)) return false;

        return true;
    }

    powagaText() {
        if (this.powaga == 1) return "Nie pali sie"
        else if (this.powaga == 2) return "Troche ważne"
        else if (this.powaga == 3) return "Ważne!"
        else return "---";
      }
}

export default Ticket