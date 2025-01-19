<?php

namespace App\Entity;

use App\Repository\AssociationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AssociationRepository::class)]
class Association
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $name = null;

    #[ORM\Column(length: 50)]
    private ?string $mail = null;

    #[ORM\Column(length: 50)]
    private ?string $phone_number = null;

    #[ORM\Column(length: 50)]
    private ?string $adress = null;

    #[ORM\Column(length: 50)]
    private ?string $activity = null;

    #[ORM\Column(length: 10)]
    private ?string $rna = null;

    #[ORM\Column]
    private ?string $image = null;

    #[ORM\Column]
    private ?string $description = null;

    #[ORM\Column]
    private ?string $website_link = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }
    
    public function getMail(): ?string
    {
        return $this->mail;
    }

    public function setMail(string $mail): self
    {
        $this->mail = $mail;

        return $this;
    }

    public function getPhone_number(): ?string
    {
        return $this->phone_number;
    }

    public function setPhone_number(string $phone_number): self
    {
        $this->phone_number = $phone_number;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getWebsite_Link(): ?string
    {
        return $this->website_link;
    }

    public function setWebsite_Link(string $website_link): self
    {
        $this->website_link = $website_link;

        return $this;
    }

    public function getAdress(): ?string
    {
        return $this->adress;
    }

    public function setAdress(string $adress): self
    {
        $this->adress = $adress;

        return $this;
    }

    public function getActivity(): ?string
    {
        return $this->activity;
    }

    public function setActivity(string $activity): self
    {
        $this->activity = $activity;

        return $this;
    }

    public function getRna(): ?string
    {
        return $this->rna;
    }

    public function setRna(string $rna): self
    {
        $this->rna = $rna;

        return $this;
    }
}
