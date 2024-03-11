package rva.implementations;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rva.models.Banka;
import rvarepository.BankaRepository;
import services.BankaService;
@Component
public class BankaServiceImpl implements BankaService {
	@Autowired
	private BankaRepository repo;
	
	@Override
	public List<Banka> getAll() {
		return repo.findAll();
	}

	@Override
	public boolean existsById(int id) {
		return repo.existsById(id);
	}

	@Override
	public Banka create(Banka t) {
		return repo.save(t);
	}

	@Override
	public Optional<Banka> update(Banka t, int id) {
		if(existsById(id)) {
				return Optional.of(repo.save(t));
		}
		return Optional.empty();
	}

	@Override
	public void delete(int id) {
		repo.deleteById(id);

	}

	@Override
	public List<Banka> getBankabyNaziv(String naziv) {
		return repo.findByNazivContainingIngoreCase(naziv);
	}

}
