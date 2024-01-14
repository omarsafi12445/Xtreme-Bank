package ebank.com.Services;

import ebank.com.Entity.*;
import ebank.com.Repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class Services implements IServices {


    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    CompteRepository compteRepository;
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    EmployesRepository employesRepository;
    @Autowired
    ReclamationRepository reclamationRepository;

   /*
    //compte
    @Override
    public Compte addcomp(Reclamation R) {return reclamationRepository.save(R);}
    @Override
    public List<Reclamation> getReclamations(){ return reclamationRepository.findAll();}
    @Override
    public Reclamation getReclamationById(int idReclamation) {
        return reclamationRepository.findById(idReclamation).get();
    }
    @Override
    public Reclamation updateReclamation(Reclamation R) {return reclamationRepository.save(R);}
    @Override
    public void deleteReclamation(int id) { reclamationRepository.deleteById(id);}

*/

    //Reclamation
    @Override
    public Reclamation addReclamation(Reclamation R) {return reclamationRepository.save(R);}
    @Override
    public List<Reclamation> getReclamations(){ return reclamationRepository.findAll();}
    @Override
    public Reclamation getReclamationById(int idReclamation) {
        return reclamationRepository.findById(idReclamation).get();
    }
    @Override
    public Reclamation updateReclamation(Reclamation R) {return reclamationRepository.save(R);}
    @Override
    public void deleteReclamation(int id) { reclamationRepository.deleteById(id);}



    //Employe
    @Override
    public Employes addEmploye(Employes E) {
        return employesRepository.save(E);
    }
    @Override
    public List<Employes> getEmployes(){
        return employesRepository.findAll();
    }
    @Override
    public Employes getEmployeById(int idEmploye) {
        return employesRepository.findById(idEmploye).get();
    }
    @Override
    public Employes updateEmploye(Employes E) {return employesRepository.save(E);}
    @Override
    public void deleteEmploye(int id) { employesRepository.deleteById(id);}




    //Client
    @Override
    public Client addClient(Client u) {
        return clientRepository.save(u);
    }
    @Override
    public List<Client> getClients(){
        return clientRepository.findAll();
    }
    @Override
    public Client getClientById(int idClient) {
        return clientRepository.findById(idClient).get();
    }
    @Override
    public Client updateClient(Client u) {return clientRepository.save(u);}
    @Override
    public void deleteClient(int id) { clientRepository.deleteById(id);}
    @Override
    public Compte ajouterCompteEtAffecterAuClient(Compte compte, int idClient) {
        Client cl = clientRepository.findById(idClient).get();
        List<Compte> c = compteRepository.findAll();
            c.add(compte);
            cl.setComptes(c);
            return compteRepository.save(compte);
    }
//trans
    @Override
    public List<Transaction> getTransactions(){
    return transactionRepository.findAll();
}

    public List<Transaction> getTransactionsByDate(Date date) {
        return transactionRepository.findByDateTransaction(date);
    }

    @Override
    public String ajoutervirement(Transaction transaction) {
        String str = "";
        Date dateToday = new Date(System.currentTimeMillis());
        if (transaction.getTypeTransaction().equals(TypeTransaction.VIREMENT) && transaction.getExpediteur().getType().equals(TypeCompte.EPARGNE)) {
            str = "On ne peut pas faire un virement a partir d'un compte epargne ! ";
        }
        if (transaction.getTypeTransaction().equals(TypeTransaction.VIREMENT) && transaction.getExpediteur().getType().equals(TypeCompte.COURANT) &&
                transaction.getExpediteur().getSolde() < transaction.getMontant() + 3) {
            str = "On ne peut pas faire un virement : Solde insuffisant !";
        }
        if (transaction.getTypeTransaction().equals(TypeTransaction.VIREMENT) && transaction.getExpediteur().getType().equals(TypeCompte.COURANT) &&
                transaction.getExpediteur().getSolde() > transaction.getMontant() + 3) {
            transaction.setDateTransaction(dateToday);
            transaction.getExpediteur().setSolde(transaction.getExpediteur().getSolde()-transaction.getMontant());
            transaction.getDestinataire().setSolde(transaction.getDestinataire().getSolde()+transaction.getMontant());
            compteRepository.save(transaction.getExpediteur());
            compteRepository.save(transaction.getDestinataire());
            transactionRepository.save(transaction);
            str = "Virement de" + transaction.getMontant() + " de compte " + transaction.getExpediteur().getIdCompte() + " vers le compte " + transaction.getDestinataire().getIdCompte() + " approuve avec succes !";
        }
        return str;
    }

    @Override
    public String ajouterRetrait(Transaction transaction) {
        String str = "";
        Date dateToday = new Date(System.currentTimeMillis());
        if (transaction.getTypeTransaction().equals(TypeTransaction.RETRAIT) && transaction.getExpediteur().getSolde() < transaction.getMontant() + 2) {
            str = " On ne peut pas faire un retrait : solde insuffisant !";
        }
        if (transaction.getTypeTransaction().equals(TypeTransaction.RETRAIT) && transaction.getExpediteur().getSolde() > transaction.getMontant() + 2) {
            transaction.setDateTransaction(dateToday);
            transaction.getExpediteur().setSolde(transaction.getExpediteur().getSolde()-transaction.getMontant());
            compteRepository.save(transaction.getExpediteur());
            transactionRepository.save(transaction);
            str = " Retrait de " + transaction.getMontant() + " de compte " + transaction.getExpediteur().getIdCompte() + " approuve avec succes !";
        }
        return str;
    }

    @Override
    public String ajouterVersement(Transaction transaction){
        String str = "";
        Date dateToday = new Date(System.currentTimeMillis());
        if(transaction.getTypeTransaction().equals(TypeTransaction.VERSEMENT) && transaction.getDestinataire().getType().equals(TypeCompte.EPARGNE) ){
            transaction.getDestinataire().setSolde(transaction.getDestinataire().getSolde()+transaction.getMontant());
            compteRepository.save(transaction.getDestinataire());
            transactionRepository.save(transaction);
            str = "Versement de  "+transaction.getMontant() +"  vers compte  " + transaction.getDestinataire().getIdCompte()  + "  approuve avec succes !";
        }
        if(transaction.getTypeTransaction().equals(TypeTransaction.VERSEMENT) && transaction.getDestinataire().getType().equals(TypeCompte.COURANT) ){
            transaction.getDestinataire().setSolde(transaction.getDestinataire().getSolde()+transaction.getMontant());
            compteRepository.save(transaction.getDestinataire());
            transactionRepository.save(transaction);
            str = "Versement de  "+transaction.getMontant() +"  vers compte  " + transaction.getDestinataire().getIdCompte()  + "  approuve avec succes !";
        }
        return str;
    }



}
